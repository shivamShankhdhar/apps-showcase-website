'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function ChessBoardView() {
  const [selectedSquare, setSelectedSquare] = useState<number>(52); // e2
  const [targetSquare, setTargetSquare] = useState<number>(36); // e4

  return (
    <div className="relative aspect-square w-full max-w-[340px] sm:max-w-[360px] mx-auto select-none">
      {/* Glow shadow */}
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-red-600/30 via-rose-500/20 to-amber-500/20 blur-xl pointer-events-none" />

      {/* Board Container */}
      <div className="relative w-full h-full rounded-[24px] overflow-hidden border-2 border-red-500/40 shadow-2xl bg-[#0e0f17] p-3 flex flex-col justify-between">
        
        {/* Top Mini Eval Bar */}
        <div className="flex items-center justify-between px-2 pb-2 text-[11px] font-mono border-b border-white/5">
          <span className="text-slate-400">Stockfish Depth 18</span>
          <span className="text-emerald-400 font-bold">+1.4 Advantage</span>
        </div>

        {/* 8x8 Chess Grid */}
        <div className="p-1 rounded-xl bg-black/60 border border-white/10 aspect-square">
          <div className="grid grid-cols-8 gap-0.5 w-full h-full rounded-lg overflow-hidden border border-black/40 text-[13px] font-bold">
            {Array.from({ length: 64 }).map((_, idx) => {
              const row = Math.floor(idx / 8);
              const col = idx % 8;
              const isDark = (row + col) % 2 === 1;

              const isSelected = idx === selectedSquare;
              const isTarget = idx === targetSquare;

              let piece = '';
              if (idx === 4) piece = '♚';
              if (idx === 60) piece = '♔';
              if (idx === 3) piece = '♛';
              if (idx === 59) piece = '♕';
              if (idx === 36) piece = '♙';
              if (idx === 18) piece = '♞';
              if (idx === 21) piece = '♟';
              if (idx === 0 || idx === 7) piece = '♜';
              if (idx === 56 || idx === 63) piece = '♖';
              if (idx === 2 || idx === 5) piece = '♝';
              if (idx === 58 || idx === 61) piece = '♗';

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedSquare(idx);
                    if (idx !== targetSquare) setTargetSquare(idx - 16 >= 0 ? idx - 16 : idx + 8);
                  }}
                  className={`flex items-center justify-center cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-amber-400/80 text-black shadow-inner font-black'
                      : isTarget
                      ? 'bg-red-600 text-white animate-pulse font-black'
                      : isDark
                      ? 'bg-[#2b1e24] text-slate-300 hover:bg-[#3b2a32]'
                      : 'bg-[#4a2e37] text-slate-100 hover:bg-[#5a3a45]'
                  }`}
                >
                  <span className="drop-shadow-sm">{piece}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Move Bar Indicator */}
        <div className="pt-2 px-2 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Best Tactical:</span>
          <span className="text-red-400 font-bold">e2 → e4 (Grandmaster)</span>
        </div>
      </div>
    </div>
  );
}
