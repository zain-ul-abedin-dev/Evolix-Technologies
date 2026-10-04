/** Evolix palette mapping shared by the image scripts: template blue -> green, navy -> black. */

const GREEN_HUE = 92.6;
const NEUTRAL_HUE = 20;

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
  if (s === 0) return [l * 255, l * 255, l * 255];
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
  return [hue(h + 1 / 3) * 255, hue(h) * 255, hue(h - 1 / 3) * 255];
}

const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/** How "blue" a pixel is: 1 inside 195-270deg, fading out to 175/290deg, and only when saturated. */
function blueWeight(h, s) {
  const hueW = h < 195 ? smooth(175, 195, h) : h > 270 ? 1 - smooth(270, 290, h) : 1;
  return hueW * smooth(0.04, 0.14, s);
}

export function mapPixel(r, g, b, mode) {
  const [h, s, l] = rgbToHsl(r, g, b);
  const w = blueWeight(h, s);
  if (w === 0) return null;

  let target;
  const dark = 1 - smooth(0.22, 0.4, l); // 1 = navy, 0 = mid/light blue
  const black = hslToRgb(NEUTRAL_HUE, Math.min(s, 0.08), l * 0.58);
  if (mode === "pattern") {
    const light = smooth(0.8, 0.92, l);
    const green = hslToRgb(GREEN_HUE, s, l * 0.957);
    const warm = hslToRgb(NEUTRAL_HUE, Math.min(s * 0.3, 0.15), l);
    // Light tints of the pattern stay green-tinted (soft green glow) rather than grey.
    const greenTint = hslToRgb(GREEN_HUE, Math.min(s * 0.45, 0.38), l);
    const lightTarget = l > 0.97 ? warm : greenTint;
    const mid = green.map((v, i) => v + (lightTarget[i] - v) * light);
    target = mid.map((v, i) => v + (black[i] - v) * dark);
  } else {
    const grey = hslToRgb(NEUTRAL_HUE, s * 0.12, l * 0.9);
    target = grey.map((v, i) => v + (black[i] - v) * dark);
  }
  return [r, g, b].map((v, i) => Math.round(v + (target[i] - v) * w));
}

/** Recolours a raw RGBA buffer in place. `mode`: "pattern" (blue -> green) or "photo" (blue backdrop -> neutral). */
export function recolorRaw(data, mode) {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const mapped = mapPixel(data[i], data[i + 1], data[i + 2], mode);
    if (mapped) [data[i], data[i + 1], data[i + 2]] = mapped;
  }
  return data;
}
