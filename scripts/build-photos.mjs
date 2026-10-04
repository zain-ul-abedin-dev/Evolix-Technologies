/**
 * Builds the photos used on the site into public/assets/images/evolix/, replacing the grey
 * placeholder images that ship with the Inotek template. Each output is cover-cropped to the exact
 * size of the placeholder it replaces (so the template layout is unchanged). Blue tech images are
 * recoloured to the Evolix green.
 *
 * Usage: node scripts/build-photos.mjs   (swap any `src` for your own photo and re-run)
 * Source: INOTEK_SRC env var, default ../inotek/assets (the original template).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { recolorRaw } from "./lib/palette.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.resolve(root, process.env.INOTEK_SRC || "../inotek/assets", "images");
const dest = path.join(root, "public/assets/images/evolix");

// Placeholder sizes from the template.
const SIZE = {
  projectCard: [432, 520],
  projectWide: [424, 300],
  detail: [872, 500],
  detailHalf: [424, 300],
  blogCard: [392, 284],
  blogDetail: [832, 500],
  thumb: [88, 88],
  avatar: [140, 140],
};

/** [output path, source image, size, recolour?] */
const JOBS = [];
const add = (out, from, size, recolor = false, extract = null) => JOBS.push({ out, from, size, recolor, extract });

// Projects (slugs from src/config/site.ts)
const PROJECTS = {
  "webx-enterprise-platform": ["project/hm6-img01.webp", false],
  "business-strategy-analytics": ["project/hm8-img01.webp", true],
  "3d-product-design": ["project/hm8-img02.webp", true],
  "global-saas-infrastructure": ["project/hm8-img03.webp", true],
};
for (const [slug, [from, recolor]] of Object.entries(PROJECTS)) {
  add(`projects/${slug}-card.webp`, from, SIZE.projectCard, recolor);
  add(`projects/${slug}-wide.webp`, from, SIZE.projectWide, recolor);
  add(`projects/${slug}-detail.webp`, from, SIZE.detail, recolor);
}
add("projects/detail-research.webp", "sidebar/sidebar-4.webp", [424, 280]);
add("projects/detail-analysis.webp", "service/hm6-img01.webp", [424, 280]);

// Blog posts
const BLOGS = {
  "top-seo-marketing-strategies-2026": ["service/hm6-img03.webp", false],
  "building-scalable-saas-nextjs": ["blog/hm8-img01.webp", true],
  "modern-ui-ux-design-principles": ["sidebar/sidebar-6.webp", false],
};
for (const [slug, [from, recolor]] of Object.entries(BLOGS)) {
  add(`blog/${slug}-card.webp`, from, SIZE.blogCard, recolor);
  add(`blog/${slug}-detail.webp`, from, SIZE.blogDetail, recolor);
  add(`blog/${slug}-thumb.webp`, from, SIZE.thumb, recolor);
}

// Service detail pages
const SERVICES = {
  "web-development": ["sidebar/sidebar-5.webp", false],
  "seo-marketing": ["service/hm7-img04.webp", false],
  "ui-ux-design": ["choose/hm7-img01.webp", false],
  "search-engine-optimization": ["service/hm6-img02.webp", false],
  "cloud-security": ["service/hm8-img02.webp", true],
  "3d-graphics": ["service/hm8-img04.webp", true],
};
for (const [slug, [from, recolor]] of Object.entries(SERVICES)) add(`services/${slug}.webp`, from, SIZE.detail, recolor);
add("services/detail-team.webp", "sidebar/sidebar-6.webp", SIZE.detailHalf);
add("services/detail-meeting.webp", "sidebar/sidebar-4.webp", SIZE.detailHalf);
["team/hm5-img01.webp", "team/hm5-img02.webp", "team/hm5-img03.webp", "team/hm5-img04.webp"].forEach((from, i) =>
  add(`services/collab-0${i + 1}.webp`, from, [127, 127]),
);

// About page
add("about/intro.webp", "service/hm6-img02.webp", [346, 360]);
add("about/profile.webp", "team/details-img01.webp", [274, 320]);
add("about/achievement.webp", "service/hm6-img01.webp", [595, 705]);

// About page team slider cards (template slot 384x420)
["team/hm5-img01.webp", "team/hm5-img02.webp", "team/hm5-img03.webp", "team/hm5-img04.webp"].forEach((from, i) =>
  add(`team/member-0${i + 1}.webp`, from, [384, 420]),
);

// Newsletter banner thumbnail (template slot 151x195)
add("newsletter.webp", "hero/hm7-img01.webp", [151, 195]);

// Testimonial avatars: square face crops ({ left, top, width, height } in source pixels).
add("testimonials/client-01.webp", "hero/hm7-img01.webp", SIZE.avatar, false, { left: 327, top: 40, width: 220, height: 220 });
add("testimonials/client-02.webp", "about/hm7-img1.webp", SIZE.avatar, false, { left: 68, top: 86, width: 120, height: 120 });
add("testimonials/client-03.webp", "about/hm7-img2.webp", SIZE.avatar, false, { left: 92, top: 78, width: 130, height: 130 });

for (const job of JOBS) {
  const [w, h] = job.size;
  const out = path.join(dest, job.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  let img = sharp(path.join(src, job.from));
  if (job.extract) img = sharp(await img.extract(job.extract).toBuffer());
  img = img.resize(w, h, { fit: "cover", position: sharp.strategy.attention });
  if (job.recolor) {
    const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    recolorRaw(data, "pattern");
    img = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  }
  await img.webp({ quality: 85 }).toFile(out);
}
console.log(`build-photos: ${JOBS.length} images in public/assets/images/evolix`);
