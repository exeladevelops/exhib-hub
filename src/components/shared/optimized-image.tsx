"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  fallback?: React.ReactNode;
  lowQualityUrl?: string;
  aspectRatio?: number;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallback,
  lowQualityUrl,
  aspectRatio,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);
  const [blur, setBlur] = useState(true);

  // Reset states when src changes
  useEffect(() => {
    setIsLoading(!priority);
    setError(false);
    setBlur(true);
  }, [src, priority]);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
    >
      {/* Low quality placeholder */}
      {isLoading && lowQualityUrl && (
        <Image
          src={lowQualityUrl}
          alt={alt}
          className={cn(
            "absolute inset-0 scale-110 blur-xl brightness-90",
            className
          )}
          fill
          priority
          {...props}
        />
      )}

      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-all duration-300",
          blur && "scale-110 blur-xl brightness-90",
          className
        )}
        onLoadingComplete={() => {
          setIsLoading(false);
          setBlur(false);
        }}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        priority={priority}
        {...props}
      />
    </div>
  );
}
