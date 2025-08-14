"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type AppImgProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt?: string | null;
  fallbackSrc?: string;
};

export default function Avatar({
  src,
  alt,
  width,
  height,
  fallbackSrc = "/default-avatar.png",className,
  ...props
}: AppImgProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Image"}
      width={width || 40}
      className={cn("aspect-square rounded-full", className)}
      height={height || 40}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
