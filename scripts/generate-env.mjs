/**
 * Reads secrets from the current environment (Replit secrets / shell env)
 * and writes them to a .env file at the repo root.
 *
 * Run once with:  node scripts/generate-env.mjs
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const required = ["DISCORD_BOT_TOKEN", "DISCORD_CLIENT_SECRET", "SESSION_SECRET", "DATABASE_URL"];
const missing = required.filter((k) => !process.env[k]);

if (missing.length) {
  console.error("Missing required env vars:", missing.join(", "));
  process.exit(1);
}

const lines = [
  `DISCORD_BOT_TOKEN=${process.env.DISCORD_BOT_TOKEN}`,
  `DISCORD_CLIENT_SECRET=${process.env.DISCORD_CLIENT_SECRET}`,
  `SESSION_SECRET=${process.env.SESSION_SECRET}`,
  `DATABASE_URL=${process.env.DATABASE_URL}`,
  `DISCORD_CLIENT_ID=${process.env.DISCORD_CLIENT_ID ?? "1446826370838560859"}`,
  `DISCORD_REDIRECT_PATH=${process.env.DISCORD_REDIRECT_PATH ?? "/api/auth/callback"}`,
  `NODE_ENV=production`,
];

writeFileSync(resolve(root, ".env"), lines.join("\n") + "\n");
console.log("✓ .env generated at repo root");
