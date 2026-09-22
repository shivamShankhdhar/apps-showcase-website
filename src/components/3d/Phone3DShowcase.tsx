'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGamepad, FaGooglePlay, FaStar } from 'react-icons/fa6';
import { FiSmartphone, FiZap, FiWifi, FiBatteryCharging, FiShield } from 'react-icons/fi';

export default function Phone3DShowcase() {
  const [activeApp, setActiveApp] = useState<'chess' | 'ludo' | 'flow'>('chess');
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Motion values for smooth 3D tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to eliminate jitter
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  // Map mouse positions to 3D rotation angles (-15deg to +15deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  // Light sheen reflection position
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-md mx-auto">
      {/* Interactive App Selector Tabs Above Phone */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-red-500/20 backdrop-blur-xl mb-6 shadow-lg z-20">
        <button
          onClick={() => setActiveApp('chess')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeApp === 'chess'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>♟️ Chess Binge</span>
        </button>

        <button
          onClick={() => setActiveApp('ludo')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeApp === 'ludo'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>🎲 Ludo Binge</span>
        </button>

        <button
          onClick={() => setActiveApp('flow')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeApp === 'flow'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>⚡ FlowTask</span>
        </button>
      </div>

      {/* 3D Container with Perspective */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1200 }}
        className="relative w-full max-w-[320px] sm:max-w-[340px] h-[580px] sm:h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Ambient Backlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 via-rose-600/20 to-transparent rounded-[50px] blur-3xl -z-10 pointer-events-none animate-pulse-ring" />

        {/* 3D Smartphone Body */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full rounded-[44px] bg-[#0c0d14] border-[5px] border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(225,29,72,0.4),0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between"
        >
          {/* Outer Metallic Edge Accent */}
          <div className="absolute inset-0 rounded-[39px] border border-red-500/30 pointer-events-none z-30" />

          {/* Dynamic Light Sheen Effect */}
          <motion.div
            style={{
              left: sheenX,
              top: sheenY,
            }}
            className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-red-500/5 to-transparent pointer-events-none z-25 -rotate-45"
          />

          {/* Top Status Bar & Punch Hole Camera */}
          <div className="pt-3.5 px-6 flex items-center justify-between text-[11px] text-slate-400 font-mono z-20 shrink-0">
            <span className="font-semibold text-white">9:41</span>
            
            {/* Dynamic Island / Camera */}
            <div className="w-20 h-4.5 rounded-full bg-black/90 border border-white/10 flex items-center justify-center gap-2 px-2 shadow-inner">
              <span className="h-2 w-2 rounded-full bg-slate-900 border border-red-500/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping" />
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <FiWifi className="h-3 w-3" />
              <FiBatteryCharging className="h-3 w-3 text-emerald-400" />
            </div>
          </div>

          {/* Active Screen Content */}
          <div className="flex-1 px-4 py-3 flex flex-col justify-between overflow-hidden relative z-10">
            {activeApp === 'chess' && (
              <motion.div
                key="chess-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-between space-y-3"
              >
                {/* Game Top Bar */}
                <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-sm">
                      ♟️
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Grandmaster AI</p>
                      <p className="text-[10px] text-emerald-400 font-mono">Depth 18 • Stockfish</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
                    Eval: +1.4
                  </span>
                </div>

                {/* Simulated Interactive Chessboard */}
                <div className="p-2 rounded-2xl bg-[#161722] border border-red-500/20 shadow-inner">
                  <div className="grid grid-cols-8 gap-0.5 aspect-square rounded-xl overflow-hidden border border-black/40 text-[11px] font-bold">
                    {Array.from({ length: 64 }).map((_, idx) => {
                      const row = Math.floor(idx / 8);
                      const col = idx % 8;
                      const isDark = (row + col) % 2 === 1;

                      // Highlight active move squares
                      const isSelected = idx === 52; // e2
                      const isTarget = idx === 36; // e4

                      let piece = '';
                      if (idx === 4) piece = '♚';
                      if (idx === 60) piece = '♔';
                      if (idx === 3) piece = '♛';
                      if (idx === 59) piece = '♕';
                      if (idx === 36) piece = '♙';
                      if (idx === 18) piece = '♞';
                      if (idx === 21) piece = '♟';

                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-amber-400/80 text-black'
                              : isTarget
                              ? 'bg-red-600 text-white animate-pulse'
                              : isDark
                              ? 'bg-[#2a2024] text-slate-300'
                              : 'bg-[#402a32] text-slate-100'
                          }`}
                        >
                          <span className="drop-shadow-xs">{piece}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Move Info */}
                <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Next Best Move:</span>
                    <span className="text-red-400 font-mono font-bold">e2 → e4 (Best)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full w-[65%] bg-gradient-to-r from-red-600 to-rose-500" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeApp === 'ludo' && (
              <motion.div
                key="ludo-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-between space-y-3"
              >
                {/* Ludo Top Bar */}
                <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-sm">
                      🎲
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Ludo Binge Arena</p>
                      <p className="text-[10px] text-amber-400 font-mono">Real-Time Multiplayer</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    60 FPS Loop
                  </span>
                </div>

                {/* Simulated Ludo Board */}
                <div className="p-3 rounded-2xl bg-[#141520] border border-red-500/20 aspect-square flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
                    <div className="rounded-xl bg-red-600/30 border border-red-500/40 p-2 flex items-center justify-center font-bold text-red-400 text-xs">
                      🔴 Red Base
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-slate-400">
                      ⬆ Track
                    </div>
                    <div className="rounded-xl bg-emerald-600/30 border border-emerald-500/40 p-2 flex items-center justify-center font-bold text-emerald-400 text-xs">
                      🟢 Green Base
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-slate-400">
                      ⬅ Track
                    </div>
                    <div className="rounded-xl bg-gradient-to-tr from-red-600 via-amber-500 to-emerald-500 flex items-center justify-center text-xs font-black text-white shadow-md">
                      ⭐ HOME
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-slate-400">
                      Track ➡
                    </div>
                    <div className="rounded-xl bg-blue-600/30 border border-blue-500/40 p-2 flex items-center justify-center font-bold text-blue-400 text-xs">
                      🔵 Blue Base
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-slate-400">
                      ⬇ Track
                    </div>
                    <div className="rounded-xl bg-amber-500/30 border border-amber-500/40 p-2 flex items-center justify-center font-bold text-amber-400 text-xs">
                      🟡 Yellow Base
                    </div>
                  </div>
                </div>

                {/* Dice Roll Action */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white font-black text-base flex items-center justify-center shadow-md animate-bounce">
                      6
                    </div>
                    <p className="text-[11px] font-semibold text-white">Your Turn • Roll 6!</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Move Pawn</span>
                </div>
              </motion.div>
            )}

            {activeApp === 'flow' && (
              <motion.div
                key="flow-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-between space-y-3"
              >
                {/* FlowTask Top Bar */}
                <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-sm">
                      ⚡
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">FlowTask Focus</p>
                      <p className="text-[10px] text-blue-400 font-mono">Pomodoro Engine</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                    Offline SQLite
                  </span>
                </div>

                {/* Timer Circle */}
                <div className="p-4 rounded-2xl bg-[#141520] border border-red-500/20 aspect-square flex flex-col items-center justify-center space-y-2">
                  <div className="h-28 w-28 rounded-full border-4 border-red-600/30 border-t-red-500 flex flex-col items-center justify-center shadow-lg">
                    <span className="text-2xl font-black font-mono text-white">24:48</span>
                    <span className="text-[10px] font-bold text-red-400 uppercase">Deep Work</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">Session 3 of 4</p>
                </div>

                {/* Task List */}
                <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Compile Signed Android AAB</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 line-through">
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                    <span>Stockfish FEN parsing unit tests</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Home Indicator Bar */}
            <div className="w-28 h-1 rounded-full bg-slate-500/60 mx-auto mt-2" />
          </div>
        </motion.div>

        {/* 3D Floating Feature Pills Surrounding Phone */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -left-6 px-3 py-1.5 rounded-2xl bg-[#12131c]/90 border border-red-500/40 backdrop-blur-md shadow-xl text-[11px] font-bold text-white flex items-center gap-1.5 z-35"
        >
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span>Expo SDK 57</span>
        </motion.div>

        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-8 px-3 py-1.5 rounded-2xl bg-[#12131c]/90 border border-emerald-500/40 backdrop-blur-md shadow-xl text-[11px] font-bold text-white flex items-center gap-1.5 z-35"
        >
          <FaStar className="h-3 w-3 text-amber-400" />
          <span>4.9★ Rated</span>
        </motion.div>

        <motion.div
          animate={{ y: [-3, 5, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-3 -left-6 px-3 py-1.5 rounded-2xl bg-[#12131c]/90 border border-red-500/40 backdrop-blur-md shadow-xl text-[11px] font-bold text-white flex items-center gap-1.5 z-35"
        >
          <FiZap className="h-3 w-3 text-red-400" />
          <span>60 FPS Native</span>
        </motion.div>
      </div>

      <p className="text-[11px] text-slate-500 font-mono mt-3">
        Interactive 3D Preview • Move cursor over phone to tilt
      </p>
    </div>
  );
}
