// One-off: crop, grade and export sourced photos into /public/images.
// node scripts/process-photos.mjs <dir-with-originals>
// fy = vertical focus (0 top … 1 bottom) used when cropping to the slot ratio.
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
const jobs = [
  { id: "4804295", out: "hero-gym.jpg", w: 1920, h: 1080, fy: 0.5 },
  { id: "19641809", out: "hero-spa.jpg", w: 1920, h: 1080, fy: 0.45 },
  { id: "33832204", out: "hero-studio.jpg", w: 1920, h: 1080, fy: 0.37 },
  { id: "1978505", out: "seg-gym.jpg", w: 1200, h: 800, fy: 0.3 },
  { id: "6724589", out: "seg-spa.jpg", w: 1200, h: 800, fy: 0.5 },
  { id: "8436605", out: "seg-studio.jpg", w: 1200, h: 800, fy: 0.5 },
  { id: "5648032", out: "step-1.jpg", w: 1200, h: 750, fy: 0.5 },
  { id: "8555324", out: "step-2.jpg", w: 1200, h: 750, fy: 0.4 },
  { id: "3912956", out: "step-3.jpg", w: 1200, h: 750, fy: 0.5 },
];

for (const j of jobs) {
  const file = path.join(src, `${j.id}.jpg`);
  const { width: W, height: H } = await sharp(file).metadata();
  const ratio = j.w / j.h;
  // Largest box of the target ratio, positioned on the focus point.
  let cw = W, ch = Math.round(W / ratio);
  if (ch > H) { ch = H; cw = Math.round(H * ratio); }
  const top = Math.min(Math.max(Math.round(j.fy * H - ch / 2), 0), H - ch);
  const left = Math.round((W - cw) / 2);

  let img = sharp(file).extract({ left, top, width: cw, height: ch });
  if (j.flip) img = img.flop();
  await img
    .resize(j.w, j.h)
    // Brief grade: saturate(1.05) contrast(1.04)
    .modulate({ saturation: 1.05 })
    .linear(1.04, -(128 * 0.04))
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join("public/images", j.out));
  console.log(`${j.out}  ${j.w}×${j.h}  from ${cw}×${ch}@${top}`);
}
