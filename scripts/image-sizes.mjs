/**
 * Writes src/config/image-sizes.json: intrinsic [width, height] of every /assets/images/... file
 * referenced in src/. <Img> uses it to reserve the image's space before it loads (no layout shift).
 *
 * Usage: node scripts/image-sizes.mjs   (run again after adding or replacing images)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "src/config/image-sizes.json");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(p);
  }
  return files;
}

const refs = new Set();
for (const file of walk(path.join(root, "src"))) {
  for (const m of fs.readFileSync(file, "utf8").matchAll(/\/assets\/images\/[\w./-]+\.(?:webp|png|jpe?g|gif|svg)/g)) refs.add(m[0]);
}

// Generated photos are referenced through helpers (src/config/media.ts), so include them all.
const generated = path.join(root, "public/assets/images/evolix");
if (fs.existsSync(generated)) {
  const walkImages = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walkImages(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  for (const file of walkImages(generated)) refs.add("/" + path.relative(path.join(root, "public"), file).split(path.sep).join("/"));
}

const sizes = {};
for (const ref of [...refs].sort()) {
  const file = path.join(root, "public", ref);
  // A template image newly used in src/ but pruned from public/: bring it back from the template.
  const templateFile = path.resolve(root, process.env.INOTEK_SRC || "../inotek/assets", ref.replace(/^\/assets\//, ""));
  if (!fs.existsSync(file) && ref.startsWith("/assets/") && fs.existsSync(templateFile)) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.copyFileSync(templateFile, file);
    console.log(`restored from template: ${ref}`);
  }
  if (!fs.existsSync(file)) {
    console.warn(`missing: ${ref}`);
    continue;
  }
  const { width, height } = await sharp(file).metadata();
  sizes[ref] = [width, height];
}

fs.writeFileSync(out, JSON.stringify(sizes, null, 0).replace(/],/g, "],\n") + "\n");
console.log(`image-sizes.json: ${Object.keys(sizes).length} images`);
