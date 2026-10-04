/**
 * Builds the small round "happy customers" avatars (social-img01..04.webp) from the team portraits,
 * replacing the template's grey placeholder images. Re-run after changing team photos.
 * Usage: node scripts/make-avatars.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const img = (p) => path.join(root, "public/assets/images", p);

// [source portrait, horizontal face centre] – portraits are 292x280, faces sit near the top.
const FACES = [
  ["team/hm5-img01.webp", 146],
  ["team/hm5-img02.webp", 140],
  ["team/hm5-img03.webp", 152],
  ["team/hm5-img04.webp", 146],
];
const SIZE = 160;

for (const [i, [src, cx]] of FACES.entries()) {
  const out = img(`social/social-img0${i + 1}.webp`);
  await sharp(img(src))
    .extract({ left: Math.round(cx - SIZE / 2), top: 22, width: SIZE, height: SIZE })
    .resize(140, 140)
    .webp({ quality: 88 })
    .toFile(out);
  console.log("wrote", path.relative(root, out));
}
