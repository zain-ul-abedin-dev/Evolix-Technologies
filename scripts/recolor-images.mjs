/**
 * Recolours the template's blue pattern/graphic images to the Evolix palette
 * and writes them into public/assets/images (same file names, alpha preserved).
 *
 *   pattern : vivid blue -> green (#73eb0d), navy -> black (#1a1817), bluish white -> warm white
 *   photo   : only the navy/blue backdrop is neutralised (navy -> black, blue -> grey);
 *             skin tones and other colours stay untouched.
 *
 * Usage:  node scripts/recolor-images.mjs
 * Source: INOTEK_SRC env var, default ../inotek/assets (the original template).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { recolorRaw } from "./lib/palette.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.resolve(root, process.env.INOTEK_SRC || "../inotek/assets", "images");
const dest = path.join(root, "public/assets/images");

const IMAGES = {
  pattern: [
    "hero/hm5-bg01.webp",
    "hero/hm5-bg02.webp",
    "hero/check2.webp",
    "choose/hm5-bg01.webp",
    "contact/hm5-shape01.webp",
    "newsletter/hm1-bg01.webp",
    "service/hm5-icon01.webp",
    "service/hm5-icon02.webp",
    "service/hm5-icon03.webp",
    "service/hm5-icon04.webp",
    "service/hm5-icon05.webp",
    "service/hm5-icon06.webp",
    "testimonial/hm5-quote.webp",
    // Inner pages
    "bg-img/breadcrumb.webp",
    "cta/hm2-bg01.webp",
    "team/hm2-bg01.webp",
    "process/hm1-shape01.png",
    "process/hm3-img01.webp",
    "process/hm3-img02.webp",
    "process/hm3-img03.webp",
    "service/details-bg.webp",
    "project/details-bg.webp",
    "shapes/snake.webp",
    "shapes/circle.webp",
    "achivement/spin.webp",
    "callus/call-iocn.webp",
    "feature/scribble.webp",
    "hero/spin-icon.webp",
    "icons/scribble-2.webp",
    "icons/contact.png",
    "service/details-check.webp",
    // 3D icons: only their blue parts change, other colours stay.
    "process/hm1-icon1.webp",
    "process/hm1-icon2.webp",
    "process/hm1-icon3.webp",
    "process/hm1-icon4.webp",
    "service/hm1-icon01.webp",
    "service/hm1-icon02.webp",
    "service/hm1-icon03.webp",
    "service/details-icon01.webp",
    "service/details-icon02.webp",
    "service/details-icon03.webp",
  ],
  photo: ["video/hm5-bg01.webp", "contact/hm5-bg01.webp"],
};

async function recolor(rel, mode) {
  const input = path.join(src, rel);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  recolorRaw(data, mode);
  const img = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  const output = path.join(dest, rel);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  if (rel.endsWith(".png")) await img.png({ compressionLevel: 9 }).toFile(output);
  else await img.webp({ quality: 90, alphaQuality: 100 }).toFile(output);
  console.log(`${mode.padEnd(7)} ${rel}`);
}

for (const [mode, list] of Object.entries(IMAGES)) {
  for (const rel of list) await recolor(rel, mode);
}
