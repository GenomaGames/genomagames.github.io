// Stands in for `next/image` when the components are bundled for Claude
// Design. The optimizer/CDN pipeline has no meaning outside a Next.js server,
// so the image renders as a plain <img> with the layout-affecting props kept.
import type { ImgHTMLAttributes } from "react";

type StaticImport = { src: string; width?: number; height?: number };

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "height" | "width"> & {
  src: string | StaticImport;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  sizes?: string;
  loader?: unknown;
  unoptimized?: boolean;
};

const Image = ({
  src,
  alt,
  fill,
  priority: _priority,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  loader: _loader,
  unoptimized: _unoptimized,
  style,
  ...rest
}: Props) => {
  const resolved = typeof src === "string" ? src : src?.src;
  const fillStyle = fill
    ? ({
        position: "absolute" as const,
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
      })
    : undefined;

  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} src={resolved} style={{ ...fillStyle, ...style }} {...rest} />;
};

export default Image;
