/**
 * Re-compresses the images in public/assets/images that are heavier than they need to be
 * (the template ships some photos at very high quality, 300-500 KB each).
 * Same dimensions and transparency; a file is only replaced when the result is >10% smaller.
 *
 * Usage: node scripts/optimize-images.mjs   (run after build:images / adding photos)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public/assets/images");
const MIN_BYTES = 40 * 1024;

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

let before = 0;
let after = 0;
let changed = 0;
for (const file of walk(dir)) {
  const size = fs.statSync(file).size;
  if (size < MIN_BYTES || !/\.(webp|png|jpe?g)$/i.test(file)) continue;
  const input = fs.readFileSync(file);
  let output;
  if (file.endsWith(".webp")) output = await sharp(input).webp({ quality: 80, alphaQuality: 90, effort: 6, smartSubsample: true }).toBuffer();
  else if (file.endsWith(".png")) output = await sharp(input).png({ palette: true, quality: 85, compressionLevel: 9, effort: 10 }).toBuffer();
  else output = await sharp(input).jpeg({ quality: 80, mozjpeg: true }).toBuffer();

  before += size;
  if (output.length < size * 0.9) {
    fs.writeFileSync(file, output);
    after += output.length;
    changed++;
    console.log(`${String(Math.round(size / 1024)).padStart(5)} KB -> ${String(Math.round(output.length / 1024)).padStart(4)} KB  ${path.relative(dir, file)}`);
  } else after += size;
}
console.log(`optimize-images: ${changed} files, ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
