// config MUST be the first import so dotenv loads .env before anything else reads process.env
import { config } from "./config";
import app from "./app";
import { logger } from "./lib/logger";

const { port } = config;

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${port}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});
