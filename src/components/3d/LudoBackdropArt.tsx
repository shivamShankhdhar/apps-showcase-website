'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function LudoBackdropArt({ size = 480 }: { size?: number }) {
  // 16 Radiant Golden Solar Corona Rays
  const rays = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 22.5 * Math.PI) / 180;
    const isLong = i % 2 === 0;
    const innerR = 158;
    const outerR = isLong ? 214 : 196;
    const x1 = 220 + Math.cos(angle) * innerR;
    const y1 = 220 + Math.sin(angle) * innerR;
    const x2 = 220 + Math.cos(angle) * outerR;
    const y2 = 220 + Math.sin(angle) * outerR;
    return { x1, y1, x2, y2, isLong };
  });

  // Sacred Geometry Octagram (8-Pointed Star of Fortune)
  const octagramPoints = Array.from({ length: 16 })
    .map((_, i) => {
      const angle = (i * 22.5 * Math.PI) / 180;
      const r = i % 2 === 0 ? 176 : 150;
      const x = 220 + Math.cos(angle) * r;
      const y = 220 + Math.sin(angle) * r;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  // 12 Shimmering Astral Star Crosses (✦)
  const starCrosses = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const r = 188;
    const cx = 220 + Math.cos(angle) * r;
    const cy = 220 + Math.sin(angle) * r;
    return { cx, cy, color: i % 2 === 0 ? '#FDE047' : '#38BDF8' };
  });

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Deep Multi-Stop Radial Neon Aura */}
      <div
        className="absolute w-[420px] h-[420px] rounded-full blur-3xl opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(225,29,72,0.25) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute w-[320px] h-[320px] rounded-full blur-2xl opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(193,247,52,0.15) 50%, transparent 70%)',
        }}
      />

      {/* Primary Rotating Astrolabe & Solar Corona */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{ width: size, height: size }}
      >
        <svg width="100%" height="100%" viewBox="0 0 440 440">
          <defs>
            <radialGradient id="astrolabeHeroGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#C1F734" stopOpacity="0.15" />
              <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.10" />
              <stop offset="85%" stopColor="#EC4899" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#081D24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Core Radial Atmosphere */}
          <circle cx="220" cy="220" r="215" fill="url(#astrolabeHeroGlow)" />

          {/* Outer Astrolabe Rune Rings */}
          <circle
            cx="220"
            cy="220"
            r="206"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            strokeOpacity="0.5"
          />
          <circle
            cx="220"
            cy="220"
            r="194"
            fill="none"
            stroke="#C1F734"
            strokeWidth="1.2"
            strokeDasharray="14 18"
            strokeOpacity="0.4"
          />
          <circle
            cx="220"
            cy="220"
            r="168"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1"
            strokeDasharray="3 5"
            strokeOpacity="0.35"
          />

          {/* 16 Golden Radiant Corona Flares */}
          {rays.map((ray, i) => (
            <g key={`ray-${i}`}>
              <line
                x1={ray.x1}
                y1={ray.y1}
                x2={ray.x2}
                y2={ray.y2}
                stroke={ray.isLong ? '#FDE047' : '#F59E0B'}
                strokeWidth={ray.isLong ? '2.4' : '1.4'}
                strokeOpacity={ray.isLong ? 0.65 : 0.4}
                strokeLinecap="round"
              />
              {ray.isLong && (
                <circle cx={ray.x2} cy={ray.y2} r="3" fill="#FDE047" opacity="0.9" />
              )}
            </g>
          ))}

          {/* Sacred Geometry Octagram (8-Pointed Star of Fortune) */}
          <polygon
            points={octagramPoints}
            fill="none"
            stroke="#C1F734"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          {/* 12 Shimmering Astral Star Crosses */}
          {starCrosses.map((star, i) => (
            <g key={`star-${i}`}>
              <path
                d={`M ${star.cx} ${star.cy - 5} L ${star.cx + 1.8} ${star.cy - 1.2} L ${star.cx + 5} ${star.cy} L ${star.cx + 1.8} ${star.cy + 1.2} L ${star.cx} ${star.cy + 5} L ${star.cx - 1.8} ${star.cy + 1.2} L ${star.cx - 5} ${star.cy} L ${star.cx - 1.8} ${star.cy - 1.2} Z`}
                fill={star.color}
                opacity="0.85"
              />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Fast Counter-Rotating Inner Astrolabe Gear */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{ width: size, height: size }}
      >
        <svg width="100%" height="100%" viewBox="0 0 440 440">
          <circle
            cx="220"
            cy="220"
            r="138"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1"
            strokeDasharray="6 10"
            strokeOpacity="0.45"
          />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 220 + Math.cos(angle) * 138;
            const y = 220 + Math.sin(angle) * 138;
            return <circle key={i} cx={x} cy={y} r="2.5" fill="#38BDF8" opacity="0.75" />;
          })}
        </svg>
      </motion.div>

      {/* Counter-Rotating Four Corner Heraldic Guardian Medallions */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{ width: size, height: size }}
      >
        <svg width="100%" height="100%" viewBox="0 0 440 440">
          {/* Top-Left: Emerald Citadel (Green) */}
          <g>
            <circle cx="62" cy="62" r="28" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.55" />
            <circle cx="62" cy="62" r="21" fill="rgba(16, 185, 129, 0.22)" stroke="#34D399" strokeWidth="1.5" />
            <circle cx="62" cy="56" r="4.2" fill="#34D399" />
            <rect x="58" y="61" width="8" height="2" rx="1" fill="#34D399" />
            <path d="M 57.5 68 C 58.5 64, 65.5 64, 66.5 68 Z" fill="#34D399" />
            <rect x="56" y="68" width="12" height="2.5" rx="1" fill="#10B981" />
          </g>

          {/* Top-Right: Solar Citadel (Yellow) */}
          <g>
            <circle cx="378" cy="62" r="28" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.55" />
            <circle cx="378" cy="62" r="21" fill="rgba(251, 191, 36, 0.22)" stroke="#FDE047" strokeWidth="1.5" />
            <circle cx="378" cy="56" r="4.2" fill="#FDE047" />
            <rect x="374" y="61" width="8" height="2" rx="1" fill="#FDE047" />
            <path d="M 373.5 68 C 374.5 64, 381.5 64, 382.5 68 Z" fill="#FDE047" />
            <rect x="372" y="68" width="12" height="2.5" rx="1" fill="#F59E0B" />
          </g>

          {/* Bottom-Right: Sapphire Citadel (Blue) */}
          <g>
            <circle cx="378" cy="378" r="28" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.55" />
            <circle cx="378" cy="378" r="21" fill="rgba(59, 130, 246, 0.22)" stroke="#60A5FA" strokeWidth="1.5" />
            <circle cx="378" cy="372" r="4.2" fill="#60A5FA" />
            <rect x="374" y="377" width="8" height="2" rx="1" fill="#60A5FA" />
            <path d="M 373.5 384 C 374.5 380, 381.5 380, 382.5 384 Z" fill="#60A5FA" />
            <rect x="372" y="384" width="12" height="2.5" rx="1" fill="#3B82F6" />
          </g>

          {/* Bottom-Left: Ruby Citadel (Red) */}
          <g>
            <circle cx="62" cy="378" r="28" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.55" />
            <circle cx="62" cy="378" r="21" fill="rgba(239, 68, 68, 0.22)" stroke="#F87171" strokeWidth="1.5" />
            <circle cx="62" cy="372" r="4.2" fill="#F87171" />
            <rect x="58" y="377" width="8" height="2" rx="1" fill="#F87171" />
            <path d="M 57.5 384 C 58.5 380, 65.5 380, 66.5 384 Z" fill="#F87171" />
            <rect x="56" y="384" width="12" height="2.5" rx="1" fill="#DC2626" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
