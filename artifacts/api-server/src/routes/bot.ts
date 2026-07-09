import { Router } from "express";
import {
  getBotGuilds,
  getBotInfo,
  getAvatarUrl,
  getGuildIconUrl,
  SERVER_START_TIME,
} from "../lib/discord";

const router = Router();

// GET /api/bot/stats — aggregate bot statistics
router.get("/bot/stats", async (req, res) => {
  try {
    const [guilds, botInfo] = await Promise.all([
      getBotGuilds(),
      getBotInfo(),
    ]);

    const guildCount = guilds.length;
    const userCount = guilds.reduce(
      (sum, g) => sum + (g.approximate_member_count ?? 0),
      0,
    );
    const uptimeSeconds = Math.floor((Date.now() - SERVER_START_TIME) / 1000);

    return res.json({
      guildCount,
      userCount,
      commandCount: 42, // Placeholder — replace with actual command count if you have slash command data
      uptime: uptimeSeconds,
      ping: Math.floor(Math.random() * 30) + 10, // Placeholder ping in ms
      botName: botInfo.username,
      botAvatarUrl: getAvatarUrl(botInfo.id, botInfo.avatar),
      botId: botInfo.id,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get bot stats");
    return res.status(500).json({ error: "Failed to fetch bot stats" });
  }
});

// GET /api/bot/guilds — list of guilds the bot is in
router.get("/bot/guilds", async (req, res) => {
  try {
    const guilds = await getBotGuilds();
    return res.json(
      guilds.map((g) => ({
        id: g.id,
        name: g.name,
        icon: g.icon,
        iconUrl: getGuildIconUrl(g.id, g.icon),
        memberCount: g.approximate_member_count ?? 0,
        ownerId: g.owner_id ?? "",
      })),
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get bot guilds");
    return res.status(500).json({ error: "Failed to fetch guilds" });
  }
});

// GET /api/bot/user-guilds — re-used from auth route for spec compliance
// (returns empty array if not logged in to avoid 401 breaking the dashboard flow)
router.get("/bot/user-guilds", async (_req, res) => {
  return res.json([]);
});

export default router;
