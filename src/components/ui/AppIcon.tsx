import React from 'react';
import Image from 'next/image';
import { FaDiceD6, FaChessKnight, FaGamepad } from 'react-icons/fa6';
import { FiZap, FiCpu, FiSmartphone, FiCode, FiLayers } from 'react-icons/fi';

interface AppIconProps {
  title?: string;
  category?: string;
  className?: string;
  iconString?: string;
}

export default function AppIcon({
  title = '',
  category = '',
  className = 'h-6 w-6',
  iconString = '',
}: AppIconProps) {
  const lowerTitle = title.toLowerCase();
  const lowerCat = category.toLowerCase();
  const lowerIcon = iconString.toLowerCase();

  // Custom Image Icon path (e.g. /icons/helix.png)
  if (iconString && iconString.startsWith('/')) {
    return (
      <div className={`relative overflow-hidden rounded-xl shadow-xs shrink-0 ${className}`}>
        <Image
          src={iconString}
          alt={title || 'App icon'}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
    );
  }

  // Helix Stack / Helix Binge
  if (
    lowerTitle.includes('helix') ||
    lowerTitle.includes('stack') ||
    lowerIcon.includes('layers') ||
    lowerIcon.includes('helix') ||
    iconString === '🌀'
  ) {
    return (
      <div className={`relative overflow-hidden rounded-xl shadow-xs shrink-0 ${className}`}>
        <Image
          src="/icons/helix.png"
          alt="Helix Binge Icon"
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
    );
  }

  // Ludo
  if (
    lowerTitle.includes('ludo') ||
    lowerIcon.includes('dice') ||
    iconString === '🎲'
  ) {
    return <FaDiceD6 className={`${className} text-amber-400`} />;
  }

  // Chess
  if (
    lowerTitle.includes('chess') ||
    lowerIcon.includes('chess') ||
    iconString === '♟️' ||
    iconString === '♟'
  ) {
    return <FaChessKnight className={`${className} text-rose-400`} />;
  }

  // FlowTask
  if (
    lowerTitle.includes('flow') ||
    lowerTitle.includes('task') ||
    iconString === '⚡'
  ) {
    return <FiZap className={`${className} text-amber-400`} />;
  }

  // DevLens / Telemetry
  if (
    lowerTitle.includes('lens') ||
    lowerTitle.includes('dev') ||
    iconString === '🔍'
  ) {
    return <FiCpu className={`${className} text-cyan-400`} />;
  }

  // Game category fallback
  if (lowerCat === 'games' || lowerIcon.includes('game') || iconString === '🎮') {
    return <FaGamepad className={`${className} text-red-400`} />;
  }

  // App category fallback
  return <FiSmartphone className={`${className} text-red-400`} />;
}
