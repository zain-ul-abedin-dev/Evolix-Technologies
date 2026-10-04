/**
 * Builds the brand images used for SEO / social sharing:
 *   public/evolix-logo.png  logo for Google's Organization structured data (raster, >=112px)
 *   public/og-image.jpg     1200x630 preview shown when the site is shared (Facebook, WhatsApp, LinkedIn, X)
 * Usage: node scripts/make-brand-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = (p) => path.join(root, "public", p);

// Logo on white (how Google shows it), 600px wide.
const darkLogo = fs.readFileSync(pub("Evolix LOGO SVG -01.svg"));
await sharp(darkLogo, { density: 300 })
  .resize({ width: 560 })
  .extend({ top: 40, bottom: 40, left: 20, right: 20, background: "#ffffff" })
  .flatten({ background: "#ffffff" })
  .png()
  .toFile(pub("evolix-logo.png"));

// Social preview: brand-black background with the green banner glow, white logo and tagline.
const W = 1200;
const H = 630;
const banner = await sharp(pub("assets/images/bg-img/breadcrumb.webp")).resize(W, H, { fit: "cover" }).toBuffer();
const lightLogo = await sharp(fs.readFileSync(pub("Evolix LOGO SVG -02.svg")), { density: 300 }).resize({ width: 520 }).png().toBuffer();
const logoMeta = await sharp(lightLogo).metadata();
const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="${W / 2}" y="${H / 2 + logoMeta.height / 2 + 40}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#ffffff">Web Development · UI/UX Design · SEO &amp; Digital Marketing</text>
  <text x="${W / 2}" y="${H / 2 + logoMeta.height / 2 + 90}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#ffffff" fill-opacity="0.85">evolixtechnologies.com</text>
</svg>`);
await sharp(banner)
  .composite([
    { input: lightLogo, left: Math.round((W - logoMeta.width) / 2), top: Math.round(H / 2 - logoMeta.height / 2 - 40) },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(pub("og-image.jpg"));

console.log("wrote public/evolix-logo.png and public/og-image.jpg");
