import { Router } from "express";
import { randomBytes } from "crypto";
import { db, discordUsersTable } from "@workspace/db";
import {
  getOAuthUrl,
  exchangeCode,
  getDiscordUser,
  getUserGuilds,
  getAvatarUrl,
  getGuildIconUrl,
} from "../lib/discord";
import { eq } from "drizzle-orm";
import { config } from "../config";

const router = Router();

function getRedirectUri(req: import("express").Request): string {
  const proto =
    req.headers["x-forwarded-proto"] ?? req.protocol ?? "https";
  const host = req.headers["x-forwarded-host"] ?? req.headers["host"] ?? "";
  return `${proto}://${host}${config.discord.redirectPath}`;
}

// GET /api/auth/discord — redirect to Discord OAuth with CSRF state
router.get("/auth/discord", (req, res) => {
  const state = randomBytes(16).toString("hex");
  (req.session as unknown as Record<string, unknown>)["oauthState"] = state;

  req.session.save((err) => {
    if (err) {
      req.log.error({ err }, "Failed to save OAuth state to session");
      return res.redirect("/?error=session_error");
    }
    const redirectUri = getRedirectUri(req);
    const url = getOAuthUrl(redirectUri, state);
    res.redirect(url);
  });
});

// GET /api/auth/callback — handle OAuth callback with CSRF state validation
router.get("/auth/callback", async (req, res) => {
  const { code, error, state } = req.query as {
    code?: string;
    error?: string;
    state?: string;
  };

  const session = req.session as unknown as Record<string, unknown>;
  const savedState = session["oauthState"] as string | undefined;
  delete session["oauthState"];

  if (!state || !savedState || state !== savedState) {
    req.log.warn("OAuth state mismatch — possible CSRF attack");
    return res.redirect("/?error=state_mismatch");
  }

  if (error || !code) {
    req.log.warn({ error }, "OAuth callback error");
    return res.redirect("/?error=auth_failed");
  }

  try {
    const redirectUri = getRedirectUri(req);
    const tokens = await exchangeCode(code, redirectUri);
    const discordUser = await getDiscordUser(tokens.access_token);

    // Upsert user in DB
    await db
      .insert(discordUsersTable)
      .values({
        id: discordUser.id,
        username: discordUser.username,
        discriminator: discordUser.discriminator ?? "0",
        avatar: discordUser.avatar,
        email: discordUser.email,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      })
      .onConflictDoUpdate({
        target: discordUsersTable.id,
        set: {
          username: discordUser.username,
          discriminator: discordUser.discriminator ?? "0",
          avatar: discordUser.avatar,
          email: discordUser.email,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          updatedAt: new Date(),
        },
      });

    // Store user in session
    (req.session as unknown as Record<string, unknown>)["userId"] =
      discordUser.id;
    (req.session as unknown as Record<string, unknown>)["accessToken"] =
      tokens.access_token;

    req.session.save((err) => {
      if (err) {
        req.log.error({ err }, "Failed to save session");
        return res.redirect("/?error=session_failed");
      }
      res.redirect("/dashboard");
    });
  } catch (err) {
    req.log.error({ err }, "OAuth callback processing error");
    res.redirect("/?error=auth_failed");
  }
});

// GET /api/auth/me — return current user from session
router.get("/auth/me", async (req, res) => {
  const session = req.session as unknown as Record<string, unknown>;
  const userId = session["userId"] as string | undefined;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const users = await db
    .select()
    .from(discordUsersTable)
    .where(eq(discordUsersTable.id, userId))
    .limit(1);

  if (!users.length) {
    return res.status(401).json({ error: "User not found" });
  }

  const user = users[0]!;
  return res.json({
    id: user.id,
    username: user.username,
    discriminator: user.discriminator,
    avatar: user.avatar,
    avatarUrl: getAvatarUrl(user.id, user.avatar),
    email: user.email,
  });
});

// GET /api/auth/user-guilds — guilds the logged-in user manages
router.get("/auth/user-guilds", async (req, res) => {
  const session = req.session as unknown as Record<string, unknown>;
  const accessToken = session["accessToken"] as string | undefined;

  if (!accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const guilds = await getUserGuilds(accessToken);
    // Filter to guilds where user has MANAGE_GUILD permission (bit 0x20)
    const manageableGuilds = guilds.filter(
      (g) => g.owner || (Number(g.permissions) & 0x20) !== 0,
    );
    return res.json(
      manageableGuilds.map((g) => ({
        id: g.id,
        name: g.name,
        icon: g.icon,
        iconUrl: getGuildIconUrl(g.id, g.icon),
        botInstalled: false, // We could check this against bot guilds
        permissions: g.permissions,
      })),
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get user guilds");
    return res.status(500).json({ error: "Failed to fetch guilds" });
  }
});

// POST /api/auth/logout — destroy session
router.post("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      req.log.error({ err }, "Failed to destroy session");
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("discord.sid");
    return res.json({ success: true });
  });
});

export default router;
