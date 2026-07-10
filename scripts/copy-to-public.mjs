/**
 * Copies the Vite build output to /public at repo root so Vercel can find it.
 * Node.js fs.cpSync is more reliable than the `cp` shell command across platforms.
 */
import { cpSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "..", "artifacts", "discord-dashboard", "dist", "public");
const dest = resolve(__dirname, "..", "public");

if (!existsSync(src)) {
  console.error(`Source not found: ${src}`);
  process.exit(1);
}

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log(`✓ Copied ${src} → ${dest}`);
