/**
 * Centralized configuration for the API server.
 *
 * All environment variables are read here — nowhere else in the codebase
 * should call process.env directly. In development, values are loaded from
 * the repo-root .env file via dotenv (safe to call even when the file does
 * not exist). In production (Vercel / Replit deployment) the platform injects
 * the variables before the process starts, so dotenv is skipped.
 */

import { config as dotenvLoad } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Load .env from repo root only in development.
// dotenv will NOT override variables that the platform has already set.
if (process.env["NODE_ENV"] !== "production") {
  const thisFile = fileURLToPath(import.meta.url);
  // src/config.ts → artifacts/api-server/src → artifacts/api-server → artifacts → repo-root
  const repoRoot = resolve(dirname(thisFile), "..", "..", "..", "..");
  dotenvLoad({ path: resolve(repoRoot, ".env") });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Environment variable "${key}" is required but not set.\n` +
        `→ Add it to your .env file (local dev) or Vercel / Replit environment settings.`,
    );
  }
  return value;
}

function optional(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

// ---------------------------------------------------------------------------
// Exported config object — the single source of truth for all env vars
// ---------------------------------------------------------------------------

export const config = {
  /** HTTP port the server listens on (Replit / Docker inject PORT automatically). */
  port: Number(optional("PORT", "8080")),

  /** Runtime environment. */
  nodeEnv: optional("NODE_ENV", "development"),

  session: {
    /** Secret used to sign session cookies — generate with crypto.randomBytes(32). */
    secret: required("SESSION_SECRET"),
  },

  discord: {
    /** Bot token from the Discord Developer Portal → Bot section. */
    botToken: required("DISCORD_BOT_TOKEN"),

    /** OAuth2 application client ID (public value). */
    clientId: optional("DISCORD_CLIENT_ID", "1446826370838560859"),

    /** OAuth2 client secret from the Developer Portal → OAuth2 section. */
    clientSecret: required("DISCORD_CLIENT_SECRET"),

    /** Relative path Vercel / Replit should redirect to after OAuth. */
    redirectPath: optional("DISCORD_REDIRECT_PATH", "/api/auth/callback"),
  },

  // NOTE: DATABASE_URL is consumed directly by @workspace/db — it does not
  // need to be re-exported here, but it must be present in the environment.
} as const;
