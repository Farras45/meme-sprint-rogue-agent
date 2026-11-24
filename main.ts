// meme-sprint-rogue-agent — Meme Sprint 3: AI Agent Goes Rogue
// Copies the pre-generated meme image (entry.png, committed in this repo)
// to $MAKEFUN_OUTPUT_DIR/entry.png (default /output).
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const dest = join(outDir, "entry.png");

// Sanity check: the committed image must be a real PNG (magic bytes),
// so a corrupt or missing file fails loudly instead of shipping garbage.
const head = readFileSync(src).subarray(0, 8);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!head.equals(PNG_MAGIC)) {
  throw new Error(`entry.png is not a valid PNG (bad magic bytes): ${src}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);
const { size } = statSync(dest);
console.log(`wrote ${dest} (${size} bytes)`);
