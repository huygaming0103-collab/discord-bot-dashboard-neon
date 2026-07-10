// Vercel serverless entry point.
// The Express app is pre-compiled by `pnpm --filter @workspace/api-server run build`
// (which runs as part of vercel-build), so Vercel only needs to bundle this thin
// shim — no workspace-package resolution required at compile time.

// @ts-ignore — compiled by esbuild before Vercel processes this file
import app from "../artifacts/api-server/dist/app.mjs";

export default app;
