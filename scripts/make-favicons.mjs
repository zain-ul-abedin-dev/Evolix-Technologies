/**
 * Builds the browser-tab icons from the Evolix mark (same shapes as public/Evolix_favicon.png):
 *   src/app/favicon.ico     16/32/48 px (PNG-in-ICO)
 *   src/app/icon.svg        scalable icon for modern browsers
 *   src/app/apple-icon.png  180 px home-screen icon (white background, as iOS expects)
 * Usage: node scripts/make-favicons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.join(root, "src/app");

const BLACK = "60,65 220,65 398,292 320,390 398,490 178,768 18,768 318,390";
const GREEN = "614,65 774,65 516,390 816,768 656,768 356,390";
const svg = (bg = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 834 834">${bg}<polygon points="${BLACK}" fill="#1a1817"/><polygon points="${GREEN}" fill="#73eb0d"/></svg>\n`;

fs.writeFileSync(path.join(app, "icon.svg"), svg());

// iOS home-screen icon: mark on white with some breathing room.
await sharp(Buffer.from(svg('<rect x="-120" y="-120" width="1074" height="1074" fill="#fff"/>').replace('viewBox="0 0 834 834"', 'viewBox="-120 -120 1074 1074"')))
  .resize(180, 180)
  .png()
  .toFile(path.join(app, "apple-icon.png"));

// favicon.ico: an ICO container holding PNG images.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(Buffer.from(svg())).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s === 256 ? 0 : s, 0);
  e.writeUInt8(s === 256 ? 0 : s, 1);
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
fs.writeFileSync(path.join(app, "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));
console.log("wrote favicon.ico, icon.svg, apple-icon.png");
