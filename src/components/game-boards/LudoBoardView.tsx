'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function LudoBoardView({ onDiceRoll }: { onDiceRoll?: (val: number) => void }) {
  const [diceVal, setDiceVal] = useState(6);
  const [isRolling, setIsRolling] = useState(false);

  const cellSize = 208 / 15;
  const corners = [
    { x: 16, y: 16, color: 'green', bg: '#10B981', dark: '#047857' },
    { x: 136, y: 16, color: 'yellow', bg: '#F59E0B', dark: '#B45309' },
    { x: 136, y: 136, color: 'blue', bg: '#3B82F6', dark: '#1D4ED8' },
    { x: 16, y: 136, color: 'red', bg: '#EF4444', dark: '#B91C1C' },
  ];

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      const v = Math.floor(Math.random() * 6) + 1;
      setDiceVal(v);
      count++;
      if (count > 7) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceVal(finalVal);
        setIsRolling(false);
        if (onDiceRoll) onDiceRoll(finalVal);
      }
    }, 70);
  };

  return (
    <div className="relative aspect-square w-full max-w-[340px] sm:max-w-[360px] mx-auto select-none">
      {/* Glow shadow */}
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-amber-500/20 via-red-600/30 to-emerald-500/20 blur-xl pointer-events-none" />

      {/* SVG Board Container */}
      <div className="relative w-full h-full rounded-[24px] overflow-hidden border-2 border-red-500/40 shadow-2xl bg-[#090b12]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 240 240"
          className="w-full h-full"
        >
          {/* Board Background Parchment */}
          <rect x="8" y="8" width="224" height="224" rx="16" fill="#181926" stroke="#2a2b3d" strokeWidth="2" />

          {/* 4 Colored Corner Yards */}
          {corners.map((yard, idx) => (
            <g key={idx}>
              {/* Yard Outer Box */}
              <rect
                x={yard.x}
                y={yard.y}
                width="88"
                height="88"
                rx="14"
                fill={yard.bg}
                stroke="#090b12"
                strokeWidth="2"
              />
              {/* Yard Inner White Well */}
              <rect
                x={yard.x + 12}
                y={yard.y + 12}
                width="64"
                height="64"
                rx="10"
                fill="#0e101a"
                stroke={yard.dark}
                strokeWidth="1.5"
              />
              {/* 4 Pawn Token Slots */}
              {[
                [26, 26],
                [62, 26],
                [26, 62],
                [62, 62],
              ].map(([cx, cy], j) => (
                <g key={j}>
                  <circle cx={yard.x + cx} cy={yard.y + cy} r="10" fill={yard.dark} opacity="0.6" />
                  <circle cx={yard.x + cx} cy={yard.y + cy} r="8" fill={yard.bg} />
                  <circle cx={yard.x + cx} cy={yard.y + cy} r="3.5" fill="#FFFFFF" opacity="0.8" />
                </g>
              ))}
            </g>
          ))}

          {/* 15x15 Track Cells */}
          {Array.from({ length: 15 }, (_, r) =>
            Array.from({ length: 15 }, (_, c) => {
              if (
                ((r < 6 || r > 8) && (c < 6 || c > 8)) ||
                (r >= 6 && r <= 8 && c >= 6 && c <= 8)
              ) {
                return null;
              }

              let fill = '#12141f';
              if ((r === 7 && c > 0 && c < 6) || (r === 6 && c === 1)) fill = '#10B981'; // Green path
              if ((c === 7 && r > 0 && r < 6) || (r === 1 && c === 8)) fill = '#F59E0B'; // Yellow path
              if ((r === 7 && c > 8 && c < 14) || (r === 8 && c === 13)) fill = '#3B82F6'; // Blue path
              if ((c === 7 && r > 8 && r < 14) || (r === 13 && c === 6)) fill = '#EF4444'; // Red path

              return (
                <rect
                  key={`${r}-${c}`}
                  x={16 + c * cellSize}
                  y={16 + r * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill={fill}
                  stroke="#2d3045"
                  strokeWidth="0.8"
                />
              );
            })
          )}

          {/* 4 Neutral Safe Star Cells */}
          {[
            [2, 6],
            [6, 12],
            [12, 8],
            [8, 2],
          ].map(([r, c], i) => (
            <g
              key={`safe-neutral-${i}`}
              transform={`translate(${16 + c * cellSize} ${16 + r * cellSize}) scale(${cellSize})`}
            >
              <polygon
                points="0.5,0.22 0.59,0.39 0.78,0.40 0.63,0.52 0.68,0.70 0.5,0.60 0.32,0.70 0.37,0.52 0.22,0.40 0.41,0.39"
                fill="#94A3B8"
              />
            </g>
          ))}

          {/* 4 Colored Starting Safe Star Cells */}
          {[
            { r: 6, c: 1, color: '#047857' },
            { r: 1, c: 8, color: '#B45309' },
            { r: 8, c: 13, color: '#1D4ED8' },
            { r: 13, c: 6, color: '#B91C1C' },
          ].map(({ r, c, color }, i) => (
            <g
              key={`safe-start-${i}`}
              transform={`translate(${16 + c * cellSize} ${16 + r * cellSize}) scale(${cellSize})`}
            >
              <polygon
                points="0.5,0.22 0.59,0.39 0.78,0.40 0.63,0.52 0.68,0.70 0.5,0.60 0.32,0.70 0.37,0.52 0.22,0.40 0.41,0.39"
                fill="#FFFFFF"
              />
            </g>
          ))}

          {/* Center Home Triangles */}
          <polygon points="100,100 120,120 100,140" fill="#10B981" stroke="#065f46" strokeWidth="1" />
          <polygon points="100,100 120,120 140,100" fill="#F59E0B" stroke="#92400e" strokeWidth="1" />
          <polygon points="140,100 120,120 140,140" fill="#3B82F6" stroke="#1e40af" strokeWidth="1" />
          <polygon points="100,140 120,120 140,140" fill="#EF4444" stroke="#991b1b" strokeWidth="1" />

          {/* Center Octagram Crest */}
          <polygon
            points="112,104 128,104 136,112 136,128 128,136 112,136 104,128 104,112"
            fill="#0b0c16"
            stroke="#FBBF24"
            strokeWidth="1.2"
          />
        </svg>

        {/* Center Interactive 3D Dice Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.button
            type="button"
            onClick={handleRoll}
            disabled={isRolling}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={`pointer-events-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 via-red-500 to-amber-600 text-white font-black text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] border-2 border-white/40 cursor-pointer transition-transform ${
              isRolling ? 'rotate-180 scale-125' : ''
            }`}
          >
            {diceVal === 1 && '⚀'}
            {diceVal === 2 && '⚁'}
            {diceVal === 3 && '⚂'}
            {diceVal === 4 && '⚃'}
            {diceVal === 5 && '⚄'}
            {diceVal === 6 && '⚅'}
          </motion.button>
        </div>

        {/* Roll Dice Overlay Indicator */}
        <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-amber-400 shadow-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Click center dice • Rolled {diceVal}!</span>
          </span>
        </div>
      </div>
    </div>
  );
}
