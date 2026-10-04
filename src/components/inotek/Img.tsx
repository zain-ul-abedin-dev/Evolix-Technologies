import type { ImgHTMLAttributes } from "react";
import sizes from "@/config/image-sizes.json";

const SIZES = sizes as unknown as Record<string, [number, number]>;

type ImgProps = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };

/**
 * Plain <img> for template markup (its CSS sizes the raw element), plus an inline
 * `aspect-ratio` from scripts/image-sizes.mjs so lazy images never shift the layout.
 * Inline style is used because the `.inotek` reset drops width/height attributes.
 */
export function Img({ src, alt, style, ...rest }: ImgProps) {
  const size = SIZES[src];
  return <img src={src} alt={alt} style={size ? { aspectRatio: `${size[0]} / ${size[1]}`, ...style } : style} {...rest} />;
}
