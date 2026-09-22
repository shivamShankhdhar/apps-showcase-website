'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithSkeletonProps extends ImageProps {
  wrapperClassName?: string;
  glowColor?: string;
}

export default function ImageWithSkeleton({
  wrapperClassName = '',
  className = '',
  alt,
  glowColor = 'rgba(225, 29, 72, 0.2)',
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Shimmer Skeleton Placeholder */}
      <div
        className={`absolute inset-0 z-0 bg-[#12131c] transition-opacity duration-700 ease-out pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.8s_infinite] -translate-x-full" />
        <div
          className="absolute inset-0 opacity-40 blur-xl"
          style={{ background: glowColor }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin" />
        </div>
      </div>

      {/* Actual Image */}
      <Image
        alt={alt}
        className={`transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-95 blur-xs'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}
