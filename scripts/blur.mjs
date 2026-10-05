// Generates tiny blur placeholders for every image in the manifest that exists
// in /public. Runs before every build (`prebuild`); output: lib/image-blur.json.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const manifest = await fs.readFile(path.join(root, "lib/images.ts"), "utf8");
const files = [...manifest.matchAll(/file:\s*"([^"]+)"/g)].map((m) => m[1]);

const out = {};
for (const file of files) {
  const abs = path.join(root, "public", file);
  try {
    const buf = await sharp(abs).resize(16).webp({ quality: 40 }).toBuffer();
    out[file] = `data:image/webp;base64,${buf.toString("base64")}`;
  } catch {
    // Not sourced yet — <Figure /> renders its placeholder.
  }
}

await fs.writeFile(path.join(root, "lib/image-blur.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`blur: ${Object.keys(out).length}/${files.length} images`);
