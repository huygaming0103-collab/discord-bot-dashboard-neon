# Discord Bot Dashboard

Web dashboard neon cyberpunk cho Discord bot — đăng nhập Discord OAuth, xem stats bot, danh sách server.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — chạy API server (port 8080)
- `pnpm --filter @workspace/discord-dashboard run dev` — chạy frontend (port 24327)
- `pnpm run typecheck` — typecheck toàn bộ project
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks/Zod từ OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema (dev only)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 + express-session + connect-pg-simple
- DB: PostgreSQL + Drizzle ORM (session store + discord_users table)
- Auth: Discord OAuth2 (CSRF state protected)
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Codegen: Orval (từ OpenAPI spec)

## Where things live

- `artifacts/discord-dashboard/` — React frontend (Landing, Dashboard, Guilds, Callback pages)
- `artifacts/api-server/src/routes/auth.ts` — Discord OAuth2 routes (login, callback, me, logout)
- `artifacts/api-server/src/routes/bot.ts` — Bot stats & guild list routes
- `artifacts/api-server/src/lib/discord.ts` — Discord REST API client
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth)
- `lib/db/src/schema/sessions.ts` — session + discord_users DB schema

## Environment Variables / Secrets

- `DISCORD_BOT_TOKEN` — bot token (secret)
- `DISCORD_CLIENT_SECRET` — OAuth client secret (secret)
- `DISCORD_CLIENT_ID` — 1446826370838560859 (env var)
- `SESSION_SECRET` — session signing secret (secret)
- `GITHUB_TOKEN` — GitHub push token (secret)
- `DATABASE_URL` — Postgres connection string (auto-provisioned)

## Discord Developer Portal Setup

Để OAuth login hoạt động, thêm redirect URI vào Discord Developer Portal:
1. Vào https://discord.com/developers/applications/1446826370838560859/oauth2
2. Thêm Redirect URI: `https://<your-replit-domain>/api/auth/callback`

## GitHub Repository

https://github.com/huygaming0103-collab/discord-bot-dashboard-neon

## Architecture decisions

- Session stored in PostgreSQL (connect-pg-simple) — không mất khi restart server
- OAuth state parameter để bảo vệ CSRF attacks
- Bot token dùng để fetch guild list & bot info từ Discord API trực tiếp
- Redirect URI được build dynamically từ request headers (x-forwarded-proto/host)

## User preferences

- Giao diện neon cyberpunk (dark background + neon purple/cyan/pink)
- Font: Orbitron (headings) + Space Grotesk (body)
