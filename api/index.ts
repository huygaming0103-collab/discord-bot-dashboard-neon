// Vercel serverless entry point — delegates all /api/* requests to the Express app.
// Vercel calls this file as a function handler for every request matched by the
// rewrite rule in vercel.json: { "source": "/api/(.*)", "destination": "/api/index" }

import app from "../artifacts/api-server/src/app";

export default app;
