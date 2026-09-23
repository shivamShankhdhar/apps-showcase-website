'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiArrowLeft,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiCopy,
  FiCheck,
  FiShare2,
  FiLayers,
  FiActivity,
  FiClock,
  FiDownload,
  FiUsers,
  FiCpu,
  FiMaximize2,
  FiX,
  FiStar,
  FiAward,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { BsQrCode } from 'react-icons/bs';
import { FaGamepad, FaGooglePlay, FaDiceD6, FaChessKnight } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { AppItem } from '@/lib/defaultData';
import QRCodeModal from '@/components/QRCodeModal';
import { LudoBoardView } from '@/components/game-boards/LudoBoardView';
import { ChessBoardView } from '@/components/game-boards/ChessBoardView';
import { LudoBackdropArt } from '@/components/3d/LudoBackdropArt';
import AppIcon from '@/components/ui/AppIcon';
import { resolveMediaUrl } from '@/lib/driveStorage';

interface GameDetailClientProps {
  game: AppItem;
}

type DetailTab = 'modes' | 'cosmetics' | 'analysis_progress' | 'specs';

export default function GameDetailClient({ game }: GameDetailClientProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [diceNumber, setDiceNumber] = useState(6);
  const [activeTab, setActiveTab] = useState<DetailTab>('modes');
  const [lastEvent, setLastEvent] = useState<string>('Game engine initialized • Ready for match');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

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

  // Authentic screenshots sets
  const chessScreenshots = [
    {
      src: '/screenshots/chess/01_home_dashboard.png',
      title: 'Home Dashboard & Play Modes',
      caption: 'Quick Play, Daily Spin Wheel, Bot Arena selector & instant resume.',
    },
    {
      src: '/screenshots/chess/02_game_setup.png',
      title: 'Match Setup & Bot Tiers',
      caption: 'Configure side (White/Black/Random), custom clocks, and 4 bot intelligence tiers.',
    },
    {
      src: '/screenshots/chess/03_live_match.png',
      title: 'Tactical Live Match',
      caption: 'Staunton luxury board, precision timers, captured piece rails, and smooth physics.',
    },
    {
      src: '/screenshots/chess/04_pro_analysis.png',
      title: 'Pro Move Analysis & Radar',
      caption: 'Evaluation Radar graph, blunder detection, accuracy score, and best candidate moves.',
    },
    {
      src: '/screenshots/chess/05_chess_academy.png',
      title: 'Chess Academy Lessons',
      caption: 'Structured lessons covering Foundations, Tactical Motifs, Openings & Endgames.',
    },
    {
      src: '/screenshots/chess/06_match_results.png',
      title: 'Match Results & ELO Review',
      caption: 'Full move breakdown, accuracy evaluation, ELO rating updates, and instant rematch.',
    },
    {
      src: '/screenshots/chess/07_daily_spin.png',
      title: 'Daily Lucky Wheel',
      caption: 'Spin daily for coins to unlock luxury board themes and collectible avatars.',
    },
    {
      src: '/screenshots/chess/08_career_profile.png',
      title: 'Career Profile & Archive',
      caption: 'Lifetime ELO progression, Win/Loss/Draw statistics, and completed match replay archive.',
    },
  ];

  const ludoScreenshots = [
    {
      src: '/screenshots/ludo/01_home_lobby.png',
      title: 'Offline Arena & Smart Bot Lobby',
      caption: 'Instant matchmaking against tactical AI bots, quick match stakes, and tablet-optimized responsive UI.',
    },
    {
      src: '/screenshots/ludo/02_game_setup.png',
      title: 'Match Rules & Player Selection',
      caption: '2 to 4 player local multiplayer battles, bot difficulty selection, and customizable player seats.',
    },
    {
      src: '/screenshots/ludo/03_classic_board.png',
      title: 'Classic Board & Real-Time HUD',
      caption: 'Ultra-smooth 60 FPS board engine, tactical haptics, safe havens, and dedicated live player HUD cards.',
    },
    {
      src: '/screenshots/ludo/04_match_results.png',
      title: 'Victory Podium & Career Progression',
      caption: 'Match results with placement rankings, coin earnings, and instant rematch controls.',
    },
    {
      src: '/screenshots/ludo/05_daily_spin.png',
      title: 'Daily Fortune Spin Wheel',
      caption: 'Interactive fortune wheel with daily streak multipliers, instant coin rewards, and bonus spins.',
    },
    {
      src: '/screenshots/ludo/06_player_profile.png',
      title: 'Player Profile & Career Statistics',
      caption: 'Lifetime win rates, total matches played, player rank tiers, and collectible cosmetics.',
    },
    {
      src: '/screenshots/ludo/07_how_to_play.png',
      title: 'Interactive Rules & Guidebook',
      caption: 'Comprehensive visual guide explaining citadel yard deployment, knockouts, safe stars, and home runs.',
    },
  ];

  const currentScreenshots = isChess ? chessScreenshots : ludoScreenshots;
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDiceRoll = (val: number) => {
    setDiceNumber(val);
    if (val === 6) {
      setLastEvent('Rolled a 6! 🌟 Token unlocked from Citadel Yard. Extra turn granted!');
    } else {
      setLastEvent(`Rolled a ${val}! Advancing token forward along outer track.`);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-red-500/20 bg-[#12131c] text-slate-300 hover:text-red-400 transition-all shadow-xs"
          >
            <FiArrowLeft className="h-3.5 w-3.5 text-red-500" />
            <span>Back to Games Hub</span>
          </Link>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Apps
            </Link>
            <span>/</span>
            <Link href="/games" className="hover:text-red-400 transition-colors">
              Games
            </Link>
            <span>/</span>
            <span className="text-white font-semibold flex items-center gap-1.5">
              <AppIcon title={game.title} category="Games" iconString={game.icon} className="h-3.5 w-3.5" />
              <span>{game.title}</span>
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Game Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-400 border border-red-500/20 flex items-center gap-1.5">
                  <AppIcon title={game.title} category="Games" iconString={game.icon} className="h-3 w-3" />
                  <span>{game.category}</span>
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                    isTesting
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                  <span>{game.status || (isTesting ? 'Closed Testing' : 'Production')}</span>
                </span>

                <span className="text-xs text-slate-400 font-mono">
                  {game.version || (isChess ? 'v2.0.2' : 'v1.0.0')}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {game.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-medium">
                {game.subtitle ||
                  (isChess
                    ? 'Grandmaster AI & Tactical Move Analysis'
                    : 'Classic Board Game & Offline Club')}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                {game.tagline}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-white/10">
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Rating</p>
                <p className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                  <FiStar className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span>{game.rating || (isChess ? '4.9 ★' : 'Coming Soon')}</span>
                </p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Mode</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">
                  100% Offline
                </p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Multiplayer</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  Pass & Play
                </p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Monetization</p>
                <p className="text-sm font-bold text-slate-200 mt-0.5">
                  Free / No Pay-to-Win
                </p>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={game.playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white font-bold text-sm shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <FaGooglePlay className="h-4 w-4" />
                <span>
                  {isTesting ? 'Join Google Play Closed Testing' : 'Get on Google Play'}
                </span>
              </a>

              <button
                type="button"
                onClick={() => setIsQrOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl border border-white/10 bg-[#12131c] text-slate-200 font-semibold text-sm hover:bg-white/5 transition-all cursor-pointer"
              >
                <BsQrCode className="h-4 w-4 text-red-400" />
                <span>Mobile QR</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl border border-white/10 bg-[#12131c] text-slate-200 font-semibold text-sm hover:bg-white/5 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <FiShare2 className="h-4 w-4 text-slate-400" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right 3D Interactive Stage */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-square rounded-3xl bg-[#12131c] border-2 border-red-500/20 p-5 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
              <LudoBackdropArt />
              <div className="relative z-10 w-full flex flex-col items-center gap-4">
                {isChess ? (
                  <ChessBoardView />
                ) : (
                  <LudoBoardView onDiceRoll={handleDiceRoll} />
                )}
                <div className="text-center px-2 py-1 rounded-xl bg-black/60 backdrop-blur-xs border border-white/10 text-[11px] text-slate-300">
                  {lastEvent}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Visual Showcase: Authentic Screenshots Gallery */}
        <section className="space-y-8 pt-4">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-400 border border-red-500/20">
              <FiLayers className="h-3.5 w-3.5" />
              <span>Authentic In-App Captures</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isChess ? '8 Production Screenshots' : 'In-App Showcase & Flow'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore the exact UI screens, dark mode aesthetics, and match features from the mobile build.
            </p>
          </div>

          {/* Main Screenshot Spotlight + Thumbnail Navigation */}
          <div className="rounded-3xl bg-[#12131c] border-2 border-red-500/25 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Highlighted Mobile Screenshot */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => setLightboxImg(currentScreenshots[activeScreenIndex].src)}
                className="relative group cursor-pointer w-full max-w-[270px] sm:max-w-[290px] rounded-[38px] p-2.5 bg-gradient-to-b from-slate-800/80 via-[#12131c] to-black border border-white/20 shadow-2xl hover:scale-[1.01] transition-transform"
              >
                {/* Simulated Phone Speaker / Dynamic Island Indicator */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20 flex items-center justify-center pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/10" />
                </div>

                <div className="relative rounded-[28px] overflow-hidden aspect-[9/19.5] bg-black flex items-center justify-center">
                  <Image
                    src={currentScreenshots[activeScreenIndex].src}
                    alt={currentScreenshots[activeScreenIndex].title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-xs z-10">
                    <FiMaximize2 className="h-5 w-5 text-red-400" />
                    <span>Click to Expand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Screenshot Description & Thumbnail Rail */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-red-400 uppercase tracking-wider">
                    Screen {activeScreenIndex + 1} of {currentScreenshots.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveScreenIndex((prev) =>
                          prev === 0 ? currentScreenshots.length - 1 : prev - 1
                        )
                      }
                      className="p-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="Previous screen"
                    >
                      <FiChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveScreenIndex((prev) =>
                          prev === currentScreenshots.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="p-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="Next screen"
                    >
                      <FiChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {currentScreenshots[activeScreenIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentScreenshots[activeScreenIndex].caption}
                </p>
              </div>

              {/* Thumbnails Strip */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Select Screen:
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {currentScreenshots.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveScreenIndex(idx)}
                      className={`relative aspect-[9/19.5] rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-black ${
                        activeScreenIndex === idx
                          ? 'border-red-500 scale-105 shadow-md shadow-red-600/30'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Product Spec Strip */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600/10 to-rose-600/10 border border-red-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-300 font-medium">
                  Package ID: <strong className="text-white font-mono">{game.package}</strong>
                </span>
                <span className="text-slate-300 font-medium">
                  Release Track: <strong className="text-white font-mono">{game.status || 'Active'}</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Interactive Information Section */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab('modes')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'modes'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FaGamepad className="h-4 w-4" />
              <span>Game Modes & Mechanics</span>
            </button>

            <button
              onClick={() => setActiveTab('cosmetics')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'cosmetics'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FiLayers className="h-4 w-4" />
              <span>Cosmetics & Unlockables</span>
            </button>

            <button
              onClick={() => setActiveTab('analysis_progress')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'analysis_progress'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FiAward className="h-4 w-4" />
              <span>{isChess ? 'Move Analysis & Academy' : 'Rewards & Career History'}</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FiCpu className="h-4 w-4" />
              <span>Offline Architecture & Tech</span>
            </button>
          </div>

          {/* TAB 1: GAME MODES & MECHANICS */}
          {activeTab === 'modes' && (
            <div className="space-y-6">
              {isChess ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 4 Bot Intelligence Tiers */}
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-4 md:col-span-2">
                    <div className="flex items-center gap-2">
                      <FiCpu className="h-5 w-5 text-red-400" />
                      <h4 className="text-base font-bold text-white">
                        4 Bot Intelligence Tiers (Offline AI)
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-cyan-400 uppercase">Beginner</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300">800 ELO</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Cyber Coliseum arena. Makes occasional tactical blunders; ideal for beginners learning the pieces.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-400 uppercase">Casual</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">1200 ELO</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Golden Arena. Plays solid opening fundamentals, pawn structures, and active center control.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-500/30 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-orange-400 uppercase">Club</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-orange-500/20 text-orange-300">1600 ELO</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Amber Citadel. Sharp tactical combinations, punishing forks, pins, and aggressive king-side attacks.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-400 uppercase">Master</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300">2000+ ELO</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Grandmaster Sanctum. Deep positional calculation, endgame precision, and zero-blunder discipline.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pass & Play Mode */}
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiUsers className="text-emerald-400 h-5 w-5" />
                      <span>Pass & Play (2 Players Offline)</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Battle friends face-to-face on a single phone. Choose White, Black, or Random side assignment with custom Untimed, Blitz, or Rapid clocks.
                    </p>
                  </div>

                  {/* FIDE Standard Compliance */}
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiCheckCircle className="text-cyan-400 h-5 w-5" />
                      <span>Strict FIDE Rule Compliance</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Full support for legal castling, en passant pawn captures, 4-way promotion choices (Queen, Rook, Bishop, Knight), 3-fold repetition, and 50-move draw rules.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiCpu className="text-cyan-400 h-5 w-5" />
                      <span>Solo Game vs Computer (Bot AI)</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Battle responsive heuristic bots offline. Toggle between <strong>Relaxed AI</strong> (casual randomized legal moves) and <strong>Tactical AI</strong> (scored heuristics prioritizing safe haven entries and knockouts).
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiUsers className="text-amber-400 h-5 w-5" />
                      <span>Pass & Play (2, 3, or 4 Players)</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Pass one phone around the table with friends. Supports custom player names, player color assignment (Green, Yellow, Blue, Red), and zero internet connection required.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs">01</span>
                      <span>Citadel Yard & Safe Star Havens</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Roll a <strong>6</strong> to deploy a pawn from the Citadel Yard and gain a bonus roll. 8 designated star-marked cells along the 52-cell track grant complete immunity from knockouts.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 font-black text-xs">02</span>
                      <span>Knockouts, Chooser & Victory</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Knocking out opposing pawns grants immediate bonus rolls. Stacked pawns trigger an in-game selection chooser. Navigate the colored home corridor to reach the victory center!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COSMETICS & UNLOCKABLES */}
          {activeTab === 'cosmetics' && (
            <div className="space-y-6">
              {isChess ? (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-4">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiLayers className="text-amber-400 h-5 w-5" />
                      <span>6 Luxury Staunton Board Themes</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Tournament Walnut', desc: 'Classic polished walnut & ivory wood', price: 'Free' },
                        { name: 'Cyberpunk Neon', desc: 'Obsidian table with electric cyan & neon lime', price: '300 Coins' },
                        { name: 'Royal Emerald', desc: 'Deep emerald velvet felt & pale mint', price: '450 Coins' },
                        { name: 'Volcano Obsidian', desc: 'Molten magma basalt & glowing copper embers', price: '600 Coins' },
                        { name: 'Imperial Amethyst', desc: 'Velvet royal purple & soft lavender mist', price: '800 Coins' },
                        { name: 'Ocean Sapphire', desc: 'Deep abyss cobalt & arctic sea foam', price: '500 Coins' },
                      ].map((theme, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{theme.name}</span>
                            <span className="text-[10px] font-mono text-amber-400">{theme.price}</span>
                          </div>
                          <p className="text-[11px] text-slate-400">{theme.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white">10 Collectible Player Avatars</h4>
                    <p className="text-xs text-slate-300">
                      Unlock distinct avatar badges to represent your persona on the player card:
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2 text-2xl">
                      {['👑', '⚔️', '🛡️', '🧙‍♂️', '🦅', '🦁', '🐉', '🤖', '⚡', '🌟'].map((av, i) => (
                        <span key={i} className="p-3 rounded-2xl bg-black/40 border border-white/10 hover:scale-110 transition-transform">
                          {av}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 8 Boards */}
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-4">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiLayers className="text-emerald-400 h-5 w-5" />
                      <span>8 Luxury Arena Themes</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { name: 'Classic Arena', sub: 'Crisp white route & emerald trim (Free)' },
                        { name: 'Ember Lounge', sub: 'Smoky terracotta sunset light (Free)' },
                        { name: 'Deep Sea', sub: 'Ink-blue felt with cool steel edge (Free)' },
                        { name: 'Velvet Room', sub: 'Diamond citadels, brass violet arena (220 LD)' },
                        { name: 'Eclipse Suite', sub: 'Orbital bases & luminous gold rings (500 LD)' },
                        { name: 'Neon Cyberpunk', sub: 'Synthwave laser grid & neon borders (450 LD)' },
                        { name: 'Royal Citadel', sub: 'Imperial gold trim & ruby mahogany (480 LD)' },
                        { name: 'Volcano Obsidian', sub: 'Charcoal felt & basalt magma glow (380 LD)' },
                      ].map((b, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                          <h5 className="text-xs font-bold text-white">{b.name}</h5>
                          <p className="text-[10px] text-slate-400 leading-snug">{b.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 10 Dice & 7 Pawns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <FaDiceD6 className="text-red-400 h-4 w-4" />
                        <span>10 Custom Dice Styles</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Ruby Classic, Carbon Black, Aurora Glass, Gilded Six, Neon Synthwave, Royal Imperial, Cyber Matrix, Glacier Prism, Nebula Relic, Obsidian Forge.
                      </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <FiShield className="text-amber-400 h-4 w-4" />
                        <span>7 Sculpted Pawn Collections</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Club Original, Prism Collection (Cut-glass cores), Orbit Runners, Royal Court, Mech Sentinels, Phoenix Legion, Jade Blossoms.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ANALYSIS & PROGRESSION */}
          {activeTab === 'analysis_progress' && (
            <div className="space-y-6">
              {isChess ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pro Move Evaluator */}
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiActivity className="text-rose-400 h-5 w-5" />
                      <span>Pro Move Evaluator & Radar</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Instant tactical review classifies every turn into <strong>Best Move</strong>, <strong>Excellent</strong>, <strong>Good</strong>, <strong>Inaccuracy</strong>, <strong>Mistake</strong>, or <strong>Blunder</strong>. Visual Evaluation Radar reveals exact momentum swings.
                    </p>
                  </div>

                  {/* Chess Academy */}
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiBookOpen className="text-amber-400 h-5 w-5" />
                      <span>Interactive Chess Academy</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Structured curriculum with on-board drills: Piece Foundations, Tactical Motifs (Pins, Forks, Skewers, Discovered Attacks), Opening Principles, and Essential King & Pawn Endgames.
                    </p>
                  </div>

                  {/* Daily Lucky Wheel & Career Profile */}
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3 md:col-span-2">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiAward className="text-emerald-400 h-5 w-5" />
                      <span>Career Statistics & Daily Lucky Wheel</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Spin daily for coins to unlock themes and avatars. Your Career Profile archives lifetime ELO progression, Win/Loss/Draw records, accuracy averages, and past match FEN replays.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Daily Fortune Spin */}
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiAward className="text-amber-400 h-5 w-5" />
                      <span>Daily Fortune Spin Wheel</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Spin once every 24 hours to win 20 to 100 LD Coins and Gems. Keep your daily streak active to unlock higher reward multipliers. Solo bot wins award 80 coins.
                    </p>
                  </div>

                  {/* Career Profile & 30 Match History */}
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiClock className="text-cyan-400 h-5 w-5" />
                      <span>30 Completed Matches Archive</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Profile screen records total matches, win count, overall win rate %, and detailed outcome logs of the last 30 completed games with date, winner, and opponent difficulty.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ARCHITECTURE & SPECS */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {game.features?.map((feature, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold">{feature.label}</p>
                    <h4 className="text-base font-bold text-white mt-0.5">{feature.value}</h4>
                  </div>
                  <FiCheckCircle className="h-5 w-5 text-emerald-400" />
                </div>
              ))}

              <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3 md:col-span-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Technology Stack & Storage Sandbox
                </h4>
                <div className="flex flex-wrap gap-2">
                  {game.technologies?.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Screenshots */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-2xl bg-black"
            >
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-white/20 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
              <div className="relative aspect-[9/16] w-full">
                <Image
                  src={lightboxImg}
                  alt="Expanded Screen"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        url={shareUrl}
        title={game.title}
      />
    </main>
  );
}
