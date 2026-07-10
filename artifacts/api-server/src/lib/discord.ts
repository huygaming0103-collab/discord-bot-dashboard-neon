import { logger } from "./logger";
import { config } from "../config";

const DISCORD_API = "https://discord.com/api/v10";
const { botToken, clientId, clientSecret } = config.discord;

if (!botToken) {
  logger.warn("DISCORD_BOT_TOKEN is not set — bot API calls will fail");
}

export function getOAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "identify email guilds",
    state,
  });
  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
}

export async function exchangeCode(
  code: string,
  redirectUri: string,
): Promise<{ access_token: string; refresh_token: string; token_type: string }> {
  const res = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OAuth token exchange failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
  }>;
}

export async function getDiscordUser(accessToken: string): Promise<{
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email: string | null;
}> {
  const res = await fetch(`${DISCORD_API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Failed to get Discord user: ${res.status}`);
  return res.json() as Promise<{
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    email: string | null;
  }>;
}

export async function getUserGuilds(accessToken: string): Promise<
  Array<{
    id: string;
    name: string;
    icon: string | null;
    permissions: string;
    owner: boolean;
  }>
> {
  const res = await fetch(`${DISCORD_API}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Failed to get user guilds: ${res.status}`);
  return res.json() as Promise<
    Array<{
      id: string;
      name: string;
      icon: string | null;
      permissions: string;
      owner: boolean;
    }>
  >;
}

export async function getBotGuilds(): Promise<
  Array<{
    id: string;
    name: string;
    icon: string | null;
    approximate_member_count?: number;
    owner_id: string;
  }>
> {
  const res = await fetch(`${DISCORD_API}/users/@me/guilds?with_counts=true`, {
    headers: { Authorization: `Bot ${botToken}` },
  });
  if (!res.ok) throw new Error(`Failed to get bot guilds: ${res.status}`);
  return res.json() as Promise<
    Array<{
      id: string;
      name: string;
      icon: string | null;
      approximate_member_count?: number;
      owner_id: string;
    }>
  >;
}

export async function getBotInfo(): Promise<{
  id: string;
  username: string;
  avatar: string | null;
}> {
  const res = await fetch(`${DISCORD_API}/users/@me`, {
    headers: { Authorization: `Bot ${botToken}` },
  });
  if (!res.ok) throw new Error(`Failed to get bot info: ${res.status}`);
  return res.json() as Promise<{
    id: string;
    username: string;
    avatar: string | null;
  }>;
}

export function getAvatarUrl(
  userId: string,
  avatarHash: string | null,
): string | null {
  if (!avatarHash) return null;
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=256`;
}

export function getGuildIconUrl(
  guildId: string,
  iconHash: string | null,
): string | null {
  if (!iconHash) return null;
  return `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.png?size=128`;
}

// Server start time for uptime tracking
export const SERVER_START_TIME = Date.now();
