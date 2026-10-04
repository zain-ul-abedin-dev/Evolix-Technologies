/**
 * Builds public/assets/css/inotek.css from the original Inotek template CSS.
 *
 *  1. Concatenates the template's vendor + theme stylesheets (same order as home-5.html).
 *  2. Recolours the palette: template blue -> Evolix green, navy -> Evolix black,
 *     bluish light tints -> warm neutral (matches the logo's #F6F4F3).
 *  3. Scopes every rule under `.inotek` so the template never leaks into the
 *     Tailwind-built header (or any other Tailwind page), and resets Tailwind's
 *     preflight inside `.inotek` so the template renders exactly as in the HTML.
 *  4. Drops rules whose classes are not used anywhere in src/ (keeps the file small).
 *  5. Minifies with lightningcss.
 *
 * Usage:  node scripts/build-inotek-css.mjs [--no-purge]
 * Source: INOTEK_SRC env var, default ../inotek/assets (the original template).
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import { transform } from "lightningcss";
import subsetFont from "subset-font";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.resolve(root, process.env.INOTEK_SRC || "../inotek/assets");
const out = path.join(root, "public/assets/css/inotek.css");
const purge = !process.argv.includes("--no-purge");

const SCOPE = ".inotek";

/* ------------------------------------------------------------------ */
/*  Colour mapping                                                     */
/* ------------------------------------------------------------------ */
const GREEN_HUE = 92.6; // #73eb0d
const NEUTRAL_HUE = 20; // #1a1817 / #f6f4f3

const EXACT = {
  "1053f3": [115, 235, 13], // theme colour
  "061153": [26, 24, 23], // theme colour 3 / dark
};

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

function hslToRgb(h, s, l) {
  h /= 360;
  if (s === 0) return [l, l, l].map((v) => Math.round(v * 255));
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hue(h + 1 / 3), hue(h), hue(h - 1 / 3)].map((v) => Math.round(v * 255));
}

/** Returns new [r,g,b] or null when the colour should stay as it is. */
function mapRgb(r, g, b) {
  const hex = [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  if (EXACT[hex]) return EXACT[hex];
  // Near-identical shades of the two anchor colours (e.g. rgb(15,83,243), rgb(5,17,83)).
  if (Math.abs(r - 16) <= 2 && Math.abs(g - 83) <= 2 && Math.abs(b - 243) <= 2) return EXACT["1053f3"];
  if (Math.abs(r - 6) <= 3 && Math.abs(g - 17) <= 3 && Math.abs(b - 83) <= 16) return EXACT["061153"];

  const [h, s, l] = rgbToHsl(r, g, b);
  if (h < 185 || h > 290 || s < 0.06) return null;
  if (l < 0.36) return hslToRgb(NEUTRAL_HUE, Math.min(s, 0.08), l * 0.58); // navy -> black
  if (l > 0.75) return hslToRgb(NEUTRAL_HUE, Math.min(s * 0.3, 0.15), l); // bluish white -> warm white
  if (s >= 0.35) return hslToRgb(GREEN_HUE, s, l * 0.957); // vivid blue/purple -> green
  return hslToRgb(NEUTRAL_HUE, s * 0.5, l); // greyish blue -> warm grey
}

const toHex = (rgb) => "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");

function recolour(value) {
  // #rrggbb / #rgb (also inside url-encoded SVGs as %23rrggbb)
  value = value.replace(/(#|%23)([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g, (m, prefix, hex) => {
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const mapped = mapRgb(...rgb);
    return mapped ? prefix + toHex(mapped).slice(1) : m;
  });
  // rgb()/rgba() with comma syntax
  value = value.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*[\d.]+\s*)?\)/g, (m, r, g, b, a) => {
    const mapped = mapRgb(+r, +g, +b);
    if (!mapped) return m;
    return a ? `rgba(${mapped.join(", ")}${a})` : `rgb(${mapped.join(", ")})`;
  });
  return value;
}

/* ------------------------------------------------------------------ */
/*  Used-class collection (purge)                                     */
/* ------------------------------------------------------------------ */
function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (/\.(tsx?|jsx?|mdx?)$/.test(entry.name)) files.push(p);
  }
  return files;
}

const usedTokens = new Set();
for (const file of walk(path.join(root, "src"))) {
  for (const token of fs.readFileSync(file, "utf8").match(/[A-Za-z0-9_-]+/g) || []) usedTokens.add(token);
}
// Classes added at runtime by third-party libraries.
const SAFE_PREFIXES = ["swiper", "odometer", "select2", "lenis", "fancybox", "is-", "f-", "char-anim"];
const isUsedClass = (cls) => usedTokens.has(cls) || SAFE_PREFIXES.some((p) => cls.startsWith(p));

function selectorIsUsed(selector) {
  // Ignore classes inside :not(...) – they only narrow the match.
  const cleaned = selector.replace(/:not\([^)]*\)/g, "");
  const classes = cleaned.match(/\.(-?[_a-zA-Z][\w-]*)/g) || [];
  return classes.every((c) => isUsedClass(c.slice(1)));
}

/* ------------------------------------------------------------------ */
/*  Scoping                                                           */
/* ------------------------------------------------------------------ */
function scopeSelector(sel) {
  const s = sel.trim();
  if (s.startsWith(":root")) return s;
  // Lenis toggles classes on <html>; the scrollbar styles belong to <body>.
  if (/^html\.lenis|^\.lenis/.test(s)) return s;
  if (/^body::-webkit-scrollbar/.test(s)) return s;
  if (/^html\s+body\b/.test(s)) return s.replace(/^html\s+body/, SCOPE);
  if (/^(html|body)(?=$|[\s.:#[>~+])/.test(s)) return s.replace(/^(html|body)/, SCOPE);
  return `${SCOPE} ${s}`;
}

const FONT_VARS = {
  "--title-font": 'var(--font-manrope), "Manrope", sans-serif',
  "--body-font": 'var(--font-noto-sans), "Noto Sans", sans-serif',
};

const WHITE = /^(var\(--white-color\)|#fff|#ffffff|white|rgb\(255, 255, 255\))$/i;
const GREEN_BG = /var\(--theme-color\)|#73eb0d/i;

const processCss = (name, css) =>
  postcss([
    {
      postcssPlugin: "inotek",
      Once(rootNode) {
        rootNode.walkDecls((decl) => {
          decl.value = recolour(decl.value);
          if (FONT_VARS[decl.prop]) decl.value = FONT_VARS[decl.prop];
        });

        rootNode.walkRules((rule) => {
          if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;

          if (purge) {
            const kept = rule.selectors.filter(selectorIsUsed);
            if (!kept.length) return rule.remove();
            rule.selectors = kept;
          }
          rule.selectors = rule.selectors.map(scopeSelector);

          // Green backgrounds need dark foreground for contrast (white on #73eb0d is unreadable).
          const hasGreenBg = rule.nodes.some((n) => n.type === "decl" && /^background(-color)?$/.test(n.prop) && GREEN_BG.test(n.value) && !/gradient/.test(n.value));
          if (hasGreenBg) {
            rule.walkDecls(/^(color|fill|stroke)$/, (d) => {
              if (WHITE.test(d.value.replace(/\s*!important/, "").trim())) d.value = d.value.replace(/^[^!]+/, "var(--dark-color) ");
            });
          }
        });

        // Remove at-rules emptied by the purge.
        rootNode.walkAtRules((at) => {
          if (/media|supports/.test(at.name) && !at.nodes?.length) at.remove();
        });
      },
    },
  ]).process(css, { from: name }).css;

/* ------------------------------------------------------------------ */
/*  Assemble                                                          */
/* ------------------------------------------------------------------ */
// Drops old-IE star hacks (`*display: inline`) – lightningcss would otherwise read them as real declarations.
// The terminating `;`/`}` is left in place so back-to-back hacks are all matched.
const read = (p) => fs.readFileSync(p, "utf8").replace(/([;{])\s*\*[a-zA-Z-]+\s*:[^;}]*(?=[;}])/g, "$1");
const parts = [
  ["bootstrap", read(path.join(src, "css/bootstrap.min.css"))],
  ["fontawesome", read(path.join(src, "fontawesome/css/fontawesome.min.css")).replace(/url\(\.\.\/webfonts\//g, "url(/assets/fontawesome/webfonts/")],
  ["flaticon", read(path.join(src, "css/flaticon.min.css")).replace(/url\('\.\.\/fonts\//g, "url('/assets/fonts/")],
  ["animate", read(path.join(src, "css/animate.min.css"))],
  ["swiper", read(path.join(root, "node_modules/swiper/swiper-bundle.css"))],
  ["odometer", read(path.join(src, "css/odometer.css"))],
  ["select2", read(path.join(src, "css/select2.min.css"))],
  ["style", read(path.join(src, "css/style.css")).replace(/url\((["']?)\.\.\//g, "url($1/assets/")],
  ["overrides", read(path.join(root, "src/styles/inotek-overrides.css"))],
];

// Tailwind's preflight (base reset) must not reach the template, which was designed against browser
// defaults + Bootstrap's reboot. Instead of undoing it inside `.inotek` (an `all: revert` rule made every
// style recalculation re-resolve 400+ properties per element and made scrolling lag), a copy of preflight
// is generated that only applies OUTSIDE `.inotek` (the Tailwind header / drawer). globals.css imports it.
const preflightOut = path.join(root, "src/styles/preflight-scoped.css");
const outsideTemplate = (sel) => {
  const s = sel.trim();
  if (/^(html|:host|:root)\b/.test(s)) return s;
  const pseudo = s.indexOf("::");
  if (pseudo === -1) return `${s}:not(${SCOPE} *)`;
  const head = s.slice(0, pseudo) || "*";
  return `${head}:not(${SCOPE} *)${s.slice(pseudo)}`;
};
const preflight = postcss([
  {
    postcssPlugin: "scope-preflight",
    Once(rootNode) {
      rootNode.walkRules((rule) => {
        if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
        rule.selectors = rule.selectors.map(outsideTemplate);
      });
    },
  },
]).process(fs.readFileSync(path.join(root, "node_modules/tailwindcss/preflight.css"), "utf8"), { from: "preflight.css" }).css;
fs.writeFileSync(preflightOut, `/* Generated by scripts/build-inotek-css.mjs from tailwindcss/preflight.css - do not edit. */\n${preflight}`);

let css = `/* Generated by scripts/build-inotek-css.mjs - do not edit by hand. */\n`;
for (const [name, content] of parts) css += `\n/* ${name} */\n` + processCss(name, content);

const { code, warnings } = transform({
  filename: "inotek.css",
  code: Buffer.from(css),
  minify: true,
  errorRecovery: true,
});
// Icons this CSS actually uses (`content:"\f015"` in the kept rules). lightningcss writes icon codes
// either as escapes or as the literal private-use character.
const codepoints = new Set();
for (const m of code.toString().matchAll(/content:\s*"([^"]*)"/gi)) {
  for (const esc of m[1].matchAll(/\\([0-9a-f]{4,6})/gi)) codepoints.add(parseInt(esc[1], 16));
  for (const ch of m[1].replace(/\\[0-9a-f]{4,6}\s?/gi, "")) if (ch.codePointAt(0) > 0x7f) codepoints.add(ch.codePointAt(0));
}
if (codepoints.size < 10) throw new Error(`Only ${codepoints.size} icon codepoints found - refusing to subset Font Awesome (icons would break).`);
const glyphs = String.fromCodePoint(...[...codepoints].sort((a, b) => a - b));
const hash = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);

// Font Awesome: woff2 only (every supported browser loads it; the .ttf fallbacks are dead weight).
// Font URLs carry a version of the icon set, so browsers can cache them for a year (see next.config.ts).
const finalCss = code
  .toString()
  .replace(/,url\([^)]*\.ttf\)format\("truetype"\)/g, "")
  .replace(/(\/assets\/fontawesome\/webfonts\/[^)?]+\.woff2)\)/g, `$1?v=${hash(glyphs)})`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, finalCss);
// The layout links inotek.css?v=<this> so a changed stylesheet is never served from a stale cache.
fs.writeFileSync(path.join(root, "src/config/asset-version.json"), JSON.stringify({ inotekCss: hash(finalCss) }, null, 2) + "\n");

// Images/fonts the CSS points at must exist in public/ (unused template files are deleted from there);
// copy any that are missing back from the template so new sections never get a broken background.
let restored = 0;
for (const m of finalCss.matchAll(/url\((["']?)(\/assets\/[^"')?#]+)/g)) {
  const target = path.join(root, "public", m[2]);
  const source = path.join(src, m[2].replace(/^\/assets\//, ""));
  if (!fs.existsSync(target) && fs.existsSync(source)) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
    restored++;
  }
}
if (restored) console.log(`restored ${restored} asset(s) referenced by inotek.css`);
console.log(`inotek.css: ${(finalCss.length / 1024).toFixed(0)} KB${purge ? " (purged)" : ""}, ${warnings.length} lightningcss warnings`);

// Subset the Font Awesome fonts to those icons. The full fonts are 250-450 KB each; the subsets are a
// few KB. Re-run (npm run build:css) after adding new icons.
let fontBytes = 0;
for (const m of new Set([...finalCss.matchAll(/url\((\/assets\/fontawesome\/webfonts\/[^)?]+\.woff2)/g)].map((x) => x[1]))) {
  const source = path.join(src, m.replace(/^\/assets\//, ""));
  if (!fs.existsSync(source)) continue;
  const subset = await subsetFont(fs.readFileSync(source), glyphs, { targetFormat: "woff2" });
  fs.writeFileSync(path.join(root, "public", m), subset);
  fontBytes += subset.length;
}
console.log(`font awesome: ${codepoints.size} icons, subsets total ${(fontBytes / 1024).toFixed(0)} KB`);
