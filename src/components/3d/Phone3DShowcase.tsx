'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGamepad, FaStar, FaDiceD6, FaChessKnight } from 'react-icons/fa6';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import { LudoBackdropArt } from './LudoBackdropArt';
import { LudoBoardView } from '../game-boards/LudoBoardView';
import { ChessBoardView } from '../game-boards/ChessBoardView';

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
  type: 'ludo' | 'chess';
}

const showcaseGames: ShowcaseGame[] = [
  {
    id: 'chess-binge',
    slug: 'chess-binge',
    title: 'Chess Binge',
    subtitle: '4 Bot AI Tiers & Move Evaluation',
    category: 'Games',
    icon: '♟️',
    rating: '4.9 ★',
    status: 'Production',
    accentColor: '#e11d48',
    badge: '4 Bot AI Tiers',
    spec: 'Move Evaluator & Academy',
    type: 'chess',
  },
  {
    id: 'ludo-binge',
    slug: 'ludo-binge',
    title: 'Ludo Binge',
    subtitle: 'Offline Club & Pass-and-Play',
    category: 'Games',
    icon: '🎲',
    rating: '5.0 ★',
    status: 'Closed Testing',
    accentColor: '#f59e0b',
    badge: 'Offline Club & Pass-Play',
    spec: '8 Boards • 10 Dice Styles',
    type: 'ludo',
  },
];

export default function Phone3DShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  // Auto-cycle stacked games from back to front
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseGames.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Subtle 3D tilt tracking for the floating board
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsPaused(false);
  };

  const activeGame = showcaseGames[currentIndex];

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none w-full max-w-lg mx-auto py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Stage Container without Smartphone Frame */}
      <div
        ref={showcaseRef}
        onMouseMove={handleMouseMove}
        style={{ perspective: 1200 }}
        className="relative w-full max-w-[420px] sm:max-w-[460px] h-[480px] sm:h-[510px] flex items-center justify-center"
      >
        {/* Authentic Celestial Astrolabe Artwork Behind Board */}
        <LudoBackdropArt size={480} />

        {/* Stacked Boards Rendering (Front and Behind Depth) */}
        {showcaseGames.map((game, idx) => {
          const position = (idx - currentIndex + showcaseGames.length) % showcaseGames.length;
          const isFront = position === 0;

          return (
            <motion.div
              key={game.id}
              onClick={() => !isFront && setCurrentIndex(idx)}
              animate={{
                scale: isFront ? 1 : 0.88,
                y: isFront ? 0 : -36,
                z: isFront ? 0 : -80,
                opacity: isFront ? 1 : 0.55,
              }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                zIndex: isFront ? 30 : 10,
                rotateX: isFront ? rotateX : '5deg',
                rotateY: isFront ? rotateY : '0deg',
                transformStyle: 'preserve-3d',
              }}
              className={`absolute w-full max-w-[350px] sm:max-w-[370px] cursor-pointer flex flex-col items-center ${
                !isFront ? 'hover:opacity-75 transition-opacity' : ''
              }`}
            >
              {/* Header Badge floating above board */}
              <div className="mb-3 flex items-center justify-between w-full px-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
                    {game.type === 'ludo' ? (
                      <FaDiceD6 className="h-4 w-4 text-amber-400" />
                    ) : (
                      <FaChessKnight className="h-4 w-4 text-rose-400" />
                    )}
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-white tracking-tight">
                      {game.title}
                    </h3>
                    <p className="text-[10px] font-mono text-amber-400">
                      {game.spec}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/60 border border-white/15 text-emerald-400 backdrop-blur-md">
                  {game.status}
                </span>
              </div>

              {/* The Authentic Board Itself (NO SMARTPHONE FRAME) */}
              <div className="w-full">
                {game.type === 'ludo' ? (
                  <LudoBoardView />
                ) : (
                  <ChessBoardView />
                )}
              </div>

              {/* Direct Link on Active Board */}
              {isFront && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 w-full px-2"
                >
                  <Link
                    href={`/games/${game.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 hover:-translate-y-0.5 transition-all"
                  >
                    <span>Explore {game.title} Page</span>
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Auto-Stack Progress Indicators & Notice */}
      <div className="mt-4 flex items-center gap-3 z-30">
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
          Auto-moving boards • Hover to pause
        </span>
      </div>
    </div>
  );
}
