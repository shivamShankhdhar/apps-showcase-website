'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGamepad, FaGooglePlay, FaStar } from 'react-icons/fa6';
import { FiSmartphone, FiZap, FiWifi, FiBatteryCharging, FiShield, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

interface ShowcaseGame {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  rating: string;
  status: string;
  accentColor: string;
  badge: string;
  spec: string;
  screenType: 'chess' | 'ludo';
}

const showcaseGames: ShowcaseGame[] = [
  {
    id: 'chess-binge',
    slug: 'chess-binge',
    title: 'Chess Binge',
    subtitle: 'Grandmaster AI & Tactical Analysis',
    category: 'Games',
    icon: '♟️',
    rating: '4.9 ★',
    status: 'Production',
    accentColor: '#e11d48',
    badge: 'Stockfish Depth 18',
    spec: 'Multi-Depth FIDE Engine',
    screenType: 'chess',
  },
  {
    id: 'ludo-binge',
    slug: 'ludo-binge',
    title: 'Ludo Binge',
    subtitle: 'Real-Time Multiplayer & Bot Arena',
    category: 'Games',
    icon: '🎲',
    rating: '5.0 ★',
    status: 'Closed Testing',
    accentColor: '#f59e0b',
    badge: 'WebSocket Arena',
    spec: '60 FPS Native Loop',
    screenType: 'ludo',
  },
];

export default function Phone3DShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Auto-move one by one in the stack
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseGames.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Motion values for smooth 3D tilt tracking on the front phone
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsPaused(false);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none w-full max-w-md mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Stack Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{ perspective: 1200 }}
        className="relative w-full max-w-[320px] sm:max-w-[340px] h-[580px] sm:h-[620px] flex items-center justify-center"
      >
        {/* Ambient Backlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 via-rose-600/15 to-transparent rounded-[50px] blur-3xl -z-20 pointer-events-none animate-pulse-ring" />

        {/* Stacked Cards Rendering */}
        {showcaseGames.map((game, idx) => {
          // Calculate relative position in the stack: 0 is front, 1 is behind
          const position = (idx - currentIndex + showcaseGames.length) % showcaseGames.length;
          const isFront = position === 0;

          return (
            <motion.div
              key={game.id}
              onClick={() => !isFront && setCurrentIndex(idx)}
              animate={{
                scale: isFront ? 1 : 0.91,
                y: isFront ? 0 : -32,
                z: isFront ? 0 : -60,
                opacity: isFront ? 1 : 0.65,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                zIndex: isFront ? 30 : 10,
                rotateX: isFront ? rotateX : '4deg',
                rotateY: isFront ? rotateY : '0deg',
                transformStyle: 'preserve-3d',
              }}
              className={`absolute inset-0 rounded-[44px] bg-[#0c0d14] border-[5px] border-slate-700/70 shadow-[0_25px_60px_-15px_rgba(225,29,72,0.4),0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between cursor-pointer ${
                !isFront ? 'hover:opacity-85 transition-opacity' : ''
              }`}
            >
              {/* Metallic Edge Border */}
              <div className="absolute inset-0 rounded-[39px] border border-red-500/30 pointer-events-none z-30" />

              {/* Dynamic Specular Sheen (Only on front card) */}
              {isFront && (
                <motion.div
                  style={{ left: sheenX, top: sheenY }}
                  className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-red-500/5 to-transparent pointer-events-none z-25 -rotate-45"
                />
              )}

              {/* Top Status Bar & Punch Hole Camera */}
              <div className="pt-3.5 px-6 flex items-center justify-between text-[11px] text-slate-400 font-mono z-20 shrink-0">
                <span className="font-semibold text-white">9:41</span>
                
                {/* Dynamic Camera Notch */}
                <div className="w-20 h-4.5 rounded-full bg-black/90 border border-white/10 flex items-center justify-center gap-2 px-2 shadow-inner">
                  <span className="h-2 w-2 rounded-full bg-slate-900 border border-red-500/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping" />
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <FiWifi className="h-3 w-3" />
                  <FiBatteryCharging className="h-3 w-3 text-emerald-400" />
                </div>
              </div>

              {/* Screen Content */}
              <div className="flex-1 px-4 py-3 flex flex-col justify-between overflow-hidden relative z-10">
                {game.screenType === 'chess' ? (
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    {/* Game Top Header Bar */}
                    <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-base">
                          ♟️
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Chess Binge AI</p>
                          <p className="text-[10px] text-emerald-400 font-mono">Depth 18 • Grandmaster</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
                        +1.4 Eval
                      </span>
                    </div>

                    {/* Chessboard Grid */}
                    <div className="p-2 rounded-2xl bg-[#161722] border border-red-500/20 shadow-inner">
                      <div className="grid grid-cols-8 gap-0.5 aspect-square rounded-xl overflow-hidden border border-black/40 text-[11px] font-bold">
                        {Array.from({ length: 64 }).map((_, i) => {
                          const row = Math.floor(i / 8);
                          const col = i % 8;
                          const isDark = (row + col) % 2 === 1;
                          const isSelected = i === 52;
                          const isTarget = i === 36;

                          let piece = '';
                          if (i === 4) piece = '♚';
                          if (i === 60) piece = '♔';
                          if (i === 3) piece = '♛';
                          if (i === 59) piece = '♕';
                          if (i === 36) piece = '♙';
                          if (i === 18) piece = '♞';
                          if (i === 21) piece = '♟';

                          return (
                            <div
                              key={i}
                              className={`flex items-center justify-center ${
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

                    {/* Move Evaluation */}
                    <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Best Tactical Move:</span>
                        <span className="text-red-400 font-mono font-bold">e2 → e4 (Best)</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[65%] bg-gradient-to-r from-red-600 to-rose-500" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    {/* Ludo Top Bar */}
                    <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-base">
                          🎲
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Ludo Binge Arena</p>
                          <p className="text-[10px] text-amber-400 font-mono">Live WebSocket Match</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        60 FPS Loop
                      </span>
                    </div>

                    {/* Simulated 4-Color Board */}
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

                    {/* Rolling Dice Action */}
                    <div className="flex items-center justify-between p-2.5 rounded-2xl bg-black/40 border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white font-black text-base flex items-center justify-center shadow-md animate-bounce">
                          6
                        </div>
                        <p className="text-[11px] font-semibold text-white">Your Turn • Roll 6!</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Pawn Ready</span>
                    </div>
                  </div>
                )}

                {/* Direct Action Link to Game Specific Page */}
                <div className="pt-2">
                  <Link
                    href={`/games/${game.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30 transition-all"
                  >
                    <span>Explore {game.title} Page</span>
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Bottom Home Indicator */}
                <div className="w-24 h-1 rounded-full bg-slate-500/60 mx-auto mt-1" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Auto-Stack Progress Indicators & Notice */}
      <div className="mt-5 flex items-center gap-3 z-30">
        <div className="flex items-center gap-1.5">
          {showcaseGames.map((game, idx) => (
            <button
              key={game.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-red-500' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Switch to ${game.title}`}
            />
          ))}
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          Auto-moving showcase • Hover to pause
        </span>
      </div>
    </div>
  );
}
