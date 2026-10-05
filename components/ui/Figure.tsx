import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { images, type ImageSlot } from "@/lib/images";
import blurData from "@/lib/image-blur.json";

const blurs = blurData as Record<string, string>;

type FigureProps = {
  slot: ImageSlot;
  /** Responsive `sizes` — always pass one that matches the layout. */
  sizes: string;
  /** Fill the positioned parent (hero) instead of sizing by aspect ratio. */
  fill?: boolean;
  /** Hero slide one only. */
  preload?: boolean;
  /** Must be one of `images.qualities` in next.config.ts (60 or 75). */
  quality?: 60 | 75;
  className?: string;
  imgClassName?: string;
};

// Checked at render; the page is statically built, so this runs at build time.
function fileExists(file: string) {
  return fs.existsSync(path.join(process.cwd(), "public", file));
}

/**
 * Renders a manifest slot with next/image. If the file isn't there yet it
 * renders a same-sized placeholder carrying the art direction, so the layout
 * never breaks while photos are still being sourced.
 */
export function Figure({
  slot,
  sizes,
  fill,
  preload,
  quality = 75,
  className = "",
  imgClassName = "",
}: FigureProps) {
  const spec = images[slot];
  const [w, h] = spec.ratio.split(":");
  const box = fill
    ? `absolute inset-0 ${className}`
    : `relative overflow-hidden ${className}`;
  const style = fill ? undefined : { aspectRatio: `${w} / ${h}` };

  if (!fileExists(spec.file)) {
    return (
      <div
        className={`${box} flex items-center justify-center border border-dashed border-border-default bg-surface p-4 text-center`}
        style={style}
        role="img"
        aria-label={spec.alt}
      >
        <div className="max-w-xs text-xs leading-relaxed text-muted">
          <p className="font-bold text-secondary">
            {slot} · {spec.ratio} · {spec.width}×{spec.height}
          </p>
          <p className="mt-1">{spec.art}</p>
        </div>
      </div>
    );
  }

  const blur = blurs[spec.file];

  return (
    <div className={box} style={style}>
      <Image
        src={spec.file}
        alt={spec.alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={quality}
        loading={preload ? "eager" : "lazy"}
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
