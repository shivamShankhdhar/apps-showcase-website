'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiSmartphone,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiCopy,
  FiCheck,
  FiShare2,
  FiLock,
  FiLayers,
} from 'react-icons/fi';
import { BsQrCode } from 'react-icons/bs';
import { FaGamepad, FaGooglePlay, FaStar } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { AppItem } from '@/lib/defaultData';
import QRCodeModal from '@/components/QRCodeModal';

interface GameDetailClientProps {
  game: AppItem;
}

export default function GameDetailClient({ game }: GameDetailClientProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [diceNumber, setDiceNumber] = useState(6);
  const [isRolling, setIsRolling] = useState(false);

  const isChess =
    game.title.toLowerCase().includes('chess') ||
    game.package.toLowerCase().includes('chess');

  const isTesting =
    game.status?.toLowerCase().includes('closed') ||
    game.status?.toLowerCase().includes('testing') ||
    game.rating?.toLowerCase().includes('coming');

  const shareUrl =
    game.playStoreUrl ||
    (typeof window !== 'undefined' ? window.location.href : 'https://apps.shivamshankhdhar.dev');

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 6) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 80);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-red-500/20 bg-[#12131c] text-slate-300 hover:text-red-400 transition-all shadow-xs"
          >
            <FiArrowLeft className="h-3.5 w-3.5 text-red-500" />
            <span>Back to Games Hub</span>
          </Link>

          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Apps
            </Link>
            <span>/</span>
            <Link href="/games" className="hover:text-red-400 transition-colors">
              Games
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">{game.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Game Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/15 text-red-400 border border-red-500/30">
                <FaGamepad className="h-3 w-3" />
                <span>Production Board Game</span>
              </span>

              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  isTesting
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isTesting ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
                  }`}
                />
                <span>{isTesting ? 'Closed Testing' : 'Google Play Production'}</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-red-600/20 to-rose-600/20 border border-red-500/40 flex items-center justify-center text-4xl shadow-lg shrink-0">
                {game.icon || '🎮'}
              </div>
              <div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  {game.title}
                </h1>
                {game.subtitle && (
                  <p className="text-base sm:text-lg font-semibold text-red-400 mt-1">
                    {game.subtitle}
                  </p>
                )}
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Android Package: <span className="text-white">{game.package}</span> • {game.version || 'v1.0.0'}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {game.tagline}
            </p>

            {/* Ratings & Downloads Bar */}
            <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#12131c]/80 border border-red-500/20">
              <div className="flex items-center gap-2">
                <FaStar className="h-5 w-5 text-amber-400" />
                <div>
                  <p className="text-base font-bold text-white">{game.rating || '4.9'}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">User Rating</p>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div>
                <p className="text-base font-bold text-white">{game.ratingCount || '500+ Players'}</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Player Engagement</p>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div>
                <p className="text-base font-bold text-emerald-400">100% Offline</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Privacy First</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isTesting ? (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold bg-white/5 text-slate-400 border border-white/10">
                  <FiLock className="h-4 w-4 text-amber-400" />
                  <span>Closed Testing (Early Access)</span>
                </div>
              ) : game.playStoreUrl ? (
                <a
                  href={game.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all"
                >
                  <FaGooglePlay className="h-4 w-4" />
                  <span>Get on Google Play</span>
                </a>
              ) : null}

              <button
                onClick={() => setIsQrOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all"
              >
                <BsQrCode className="h-4 w-4 text-red-400" />
                <span>Scan QR on Mobile</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
                title="Copy Game Link"
              >
                {copied ? <FiCheck className="h-4 w-4 text-emerald-400" /> : <FiCopy className="h-4 w-4" />}
              </button>

              {game.privacyUrl && (
                <Link
                  href={game.privacyUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
                >
                  <FiShield className="h-4 w-4 text-red-500" />
                  <span>Privacy Policy</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Game Board Simulation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-[36px] bg-[#12131c] border-2 border-red-500/30 p-6 shadow-2xl space-y-5 relative overflow-hidden">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FiZap className="h-4 w-4 text-red-500" />
                  <span>Live Board Simulation</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Native 60 FPS
                </span>
              </div>

              {isChess ? (
                /* Chess Interactive Board Simulation */
                <div className="space-y-4">
                  <div className="p-2.5 rounded-2xl bg-[#161722] border border-red-500/20 shadow-inner">
                    <div className="grid grid-cols-8 gap-0.5 aspect-square rounded-xl overflow-hidden border border-black/40 text-[12px] font-bold">
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
                            <span>{piece}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/50 border border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Engine Analysis:</span>
                      <span className="text-red-400 font-mono font-bold">Stockfish Depth 18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Position Evaluation:</span>
                      <span className="text-emerald-400 font-mono font-bold">+1.4 (White Advantage)</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Ludo Interactive Board Simulation with Dice Roll */
                <div className="space-y-4">
                  <div className="p-3 rounded-2xl bg-[#141520] border border-red-500/20 aspect-square flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="grid grid-cols-3 grid-rows-3 gap-1.5 w-full h-full">
                      <div className="rounded-xl bg-red-600/30 border border-red-500/40 p-2 flex items-center justify-center font-bold text-red-400 text-xs">
                        🔴 Red Base
                      </div>
                      <div className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[11px] text-slate-400">
                        ⬆ Track
                      </div>
                      <div className="rounded-xl bg-emerald-600/30 border border-emerald-500/40 p-2 flex items-center justify-center font-bold text-emerald-400 text-xs">
                        🟢 Green Base
                      </div>
                      <div className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[11px] text-slate-400">
                        ⬅ Track
                      </div>
                      <div className="rounded-xl bg-gradient-to-tr from-red-600 via-amber-500 to-emerald-500 flex items-center justify-center text-xs font-black text-white shadow-md">
                        ⭐ HOME
                      </div>
                      <div className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[11px] text-slate-400">
                        Track ➡
                      </div>
                      <div className="rounded-xl bg-blue-600/30 border border-blue-500/40 p-2 flex items-center justify-center font-bold text-blue-400 text-xs">
                        🔵 Blue Base
                      </div>
                      <div className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[11px] text-slate-400">
                        ⬇ Track
                      </div>
                      <div className="rounded-xl bg-amber-500/30 border border-amber-500/40 p-2 flex items-center justify-center font-bold text-amber-400 text-xs">
                        🟡 Yellow Base
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleRollDice}
                        className={`h-10 w-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white font-black text-xl flex items-center justify-center shadow-lg transition-transform ${
                          isRolling ? 'rotate-180 scale-110' : 'hover:scale-105'
                        }`}
                      >
                        {diceNumber}
                      </button>
                      <div>
                        <p className="text-xs font-bold text-white">Interactive Dice</p>
                        <p className="text-[10px] text-slate-400">Click dice to test physics</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-red-400 font-mono">
                      {isRolling ? 'Rolling...' : `Rolled ${diceNumber}!`}
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Highlights & Features Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Highlights */}
          {game.highlights && game.highlights.length > 0 && (
            <div className="p-7 rounded-3xl bg-[#12131c]/80 border border-red-500/20 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiCheckCircle className="h-5 w-5 text-red-500" />
                <span>Engine & Gameplay Highlights</span>
              </h3>
              <ul className="space-y-3">
                {game.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specifications */}
          {game.features && game.features.length > 0 && (
            <div className="p-7 rounded-3xl bg-[#12131c]/80 border border-red-500/20 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiLayers className="h-5 w-5 text-red-500" />
                <span>Technical Specifications</span>
              </h3>
              <div className="divide-y divide-white/5 text-sm">
                {game.features.map((feat, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="text-slate-400">{feat.label}</span>
                    <span className="font-semibold text-white font-mono">{feat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technologies Architecture */}
        {game.technologies && game.technologies.length > 0 && (
          <div className="p-7 rounded-3xl bg-[#12131c]/80 border border-red-500/20 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {game.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-red-500/10 text-red-300 border border-red-500/25"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title={game.title}
        url={shareUrl}
        icon={game.icon}
        packageId={game.package}
      />
    </main>
  );
}
