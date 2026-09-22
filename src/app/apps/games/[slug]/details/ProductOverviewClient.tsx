'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiArrowLeft,
  FiZap,
  FiShield,
  FiCheckCircle,
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
  FiCheck,
  FiDatabase,
  FiExternalLink,
} from 'react-icons/fi';
import { BsQrCode } from 'react-icons/bs';
import { FaGooglePlay, FaDiceD6, FaChessKnight } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { AppItem } from '@/lib/defaultData';
import QRCodeModal from '@/components/QRCodeModal';
import { LudoBoardView } from '@/components/game-boards/LudoBoardView';
import { ChessBoardView } from '@/components/game-boards/ChessBoardView';
import { LudoBackdropArt } from '@/components/3d/LudoBackdropArt';
import AppIcon from '@/components/ui/AppIcon';

interface ProductOverviewClientProps {
  game: AppItem;
}

type TabKey = 'architecture' | 'mechanics' | 'cosmetics' | 'specifications';

export default function ProductOverviewClient({ game }: ProductOverviewClientProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('architecture');
  const [lastEvent, setLastEvent] = useState<string>('Board engine initialized • Ready for match');
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

  // Authentic screenshots
  const chessScreenshots = [
    {
      src: '/screenshots/chess/01_home_dashboard.png',
      title: 'Home Dashboard & Play Selection',
      caption: 'Quick play launchpad, daily spin rewards, AI difficulty tier switcher, and state recovery.',
    },
    {
      src: '/screenshots/chess/02_game_setup.png',
      title: 'Match Configuration & Clocks',
      caption: 'Side assignment (White/Black/Random), custom untimed/blitz timers, and 4 bot intelligence tiers.',
    },
    {
      src: '/screenshots/chess/03_live_match.png',
      title: 'Active Tactical Match Surface',
      caption: 'Staunton luxury board layout, real-time piece advantage rails, captured pieces, and move logs.',
    },
    {
      src: '/screenshots/chess/04_pro_analysis.png',
      title: 'Move Evaluation Radar & Blunder Detection',
      caption: 'On-device centipawn evaluation, move classification (Best, Good, Inaccuracy, Blunder), and FEN export.',
    },
    {
      src: '/screenshots/chess/05_chess_academy.png',
      title: 'Chess Academy Interactive Drills',
      caption: 'Curriculum covering Piece Foundations, Tactical Motifs (Pins, Forks, Skewers), Openings & Endgames.',
    },
    {
      src: '/screenshots/chess/06_match_results.png',
      title: 'Match Review & Accuracy Breakdown',
      caption: 'Full move breakdown, accuracy evaluation, ELO rating updates, and instant rematch options.',
    },
    {
      src: '/screenshots/chess/07_daily_spin.png',
      title: 'Daily Lucky Wheel & Progression',
      caption: 'Spin daily for coins to unlock luxury Staunton board themes and collectible player avatars.',
    },
    {
      src: '/screenshots/chess/08_career_profile.png',
      title: 'Career Profile & Match History Archive',
      caption: 'Lifetime ELO progression graph, Win/Loss/Draw breakdown, and completed match replay archive.',
    },
  ];

  const ludoScreenshots = [
    {
      src: '/screenshots/ludo/01_ludo_home.jpg',
      title: 'Offline Arena Home Dashboard',
      caption: '3D Hero Board, Solo Game vs Bot AI, Pass & Play, and Offline status indicator.',
    },
    {
      src: '/screenshots/ludo/02_ludo_spin.jpg',
      title: 'Daily Fortune Spin Wheel',
      caption: 'Spin daily to win 20 to 100 LD Coins and maintain your daily streak multiplier.',
    },
    {
      src: '/screenshots/ludo/03_ludo_gameplay.jpg',
      title: '4-Player Live Match Surface',
      caption: 'Full board view with 3D rolling dice physics, safe star havens, and player crowns.',
    },
    {
      src: '/screenshots/ludo/refer-earn-hero.jpg',
      title: 'Squad Invite & Match Sharing',
      caption: 'Share your squad code and QR invite with friends for local multi-device duels.',
    },
    {
      src: '/screenshots/ludo/tutorial-web.png',
      title: 'Interactive Rules & Guide',
      caption: 'Citadel yard deployment rules, knockouts, extra rolls, and home corridor instructions.',
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
    if (val === 6) {
      setLastEvent('Rolled a 6! 🌟 Token deployed from Citadel Yard. Extra turn awarded.');
    } else {
      setLastEvent(`Rolled a ${val}! Advancing active pawn along outer track.`);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/apps" className="hover:text-white transition-colors">
            Products
          </Link>
          <span className="text-slate-600">/</span>
          <span>Games</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-semibold">{game.title}</span>
        </nav>

        {/* Executive Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-medium">
                  {game.package}
                </span>
                <span className="text-slate-500">•</span>
                <span
                  className={`px-2 py-0.5 rounded border font-semibold ${
                    isTesting
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}
                >
                  {game.status || 'Active'}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{game.version || 'v1.0.0'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {game.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-medium">
                {game.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                {game.tagline}
              </p>
            </div>

            {/* Architecture Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/10 text-xs">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-mono">Platform Target</p>
                <p className="text-xs font-bold text-white font-mono mt-0.5">Android 8.0+ (API 26)</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-mono">Network Scope</p>
                <p className="text-xs font-bold text-emerald-400 mt-0.5">100% Offline Capable</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-mono">Multiplayer</p>
                <p className="text-xs font-bold text-white mt-0.5">Single-Device Pass & Play</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-mono">Privacy Track</p>
                <p className="text-xs font-bold text-slate-300 mt-0.5">Zero Identity Scrape</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={game.playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <FaGooglePlay className="h-4 w-4 text-emerald-600" />
                <span>
                  {isTesting ? 'Google Play Closed Testing' : 'Google Play Store Listing'}
                </span>
              </a>

              <button
                type="button"
                onClick={() => setIsQrOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 bg-[#12131c] text-slate-200 text-xs sm:text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
              >
                <BsQrCode className="h-4 w-4 text-slate-400" />
                <span>Device QR</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 bg-[#12131c] text-slate-200 text-xs sm:text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
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

          {/* Right Interactive Board Bench */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-square rounded-2xl bg-[#12131c] border border-white/15 p-5 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
              <LudoBackdropArt />
              <div className="relative z-10 w-full flex flex-col items-center gap-4">
                {isChess ? (
                  <ChessBoardView />
                ) : (
                  <LudoBoardView onDiceRoll={handleDiceRoll} />
                )}
                <div className="text-center px-3 py-1 rounded-lg bg-black/70 border border-white/10 text-[11px] text-slate-300 font-mono">
                  {lastEvent}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MULTI-SCREENSHOT INSPECTION SUITE */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-6 border-t border-white/10">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Visual Verification</span>
            <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
              Production Screen Captures ({currentScreenshots.length} Views)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Examining the actual Android production UI, game states, and operational screens.
            </p>
          </div>

          <div className="rounded-2xl bg-[#12131c] border border-white/15 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Screenshot Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => setLightboxImg(currentScreenshots[activeScreenIndex].src)}
                className="relative group cursor-pointer w-full max-w-[270px] sm:max-w-[290px] rounded-[30px] p-2 bg-[#09090b] border border-white/20 shadow-2xl hover:scale-[1.01] transition-transform"
              >
                <div className="relative rounded-[22px] overflow-hidden aspect-[9/16] bg-black">
                  <Image
                    src={currentScreenshots[activeScreenIndex].src}
                    alt={currentScreenshots[activeScreenIndex].title}
                    fill
                    className="object-cover"
                    sizes="300px"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium backdrop-blur-xs">
                    <FiMaximize2 className="h-4 w-4" />
                    <span>Expand High-Res</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Navigation Rail */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 font-semibold">
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
                      className="p-2 rounded-lg bg-black/40 border border-white/10 text-slate-300 hover:text-white transition-colors"
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
                      className="p-2 rounded-lg bg-black/40 border border-white/10 text-slate-300 hover:text-white transition-colors"
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
                <p className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Inspect Screen:
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {currentScreenshots.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveScreenIndex(idx)}
                      className={`relative aspect-[9/16] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        activeScreenIndex === idx
                          ? 'border-white scale-105 shadow-md'
                          : 'border-white/10 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMPREHENSIVE TABBED PRODUCT DOCUMENTATION */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-6 border-t border-white/10">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FiCpu className="h-3.5 w-3.5" />
              <span>Engine Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('mechanics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'mechanics'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FaDiceD6 className="h-3.5 w-3.5" />
              <span>Operational Mechanics & Rules</span>
            </button>

            <button
              onClick={() => setActiveTab('cosmetics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'cosmetics'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FiLayers className="h-3.5 w-3.5" />
              <span>Cosmetics Inventory & Economy</span>
            </button>

            <button
              onClick={() => setActiveTab('specifications')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'specifications'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FiCheckCircle className="h-3.5 w-3.5" />
              <span>Build Specs & Policies</span>
            </button>
          </div>

          {/* TAB 1: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isChess ? (
                <>
                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FiCpu className="h-4 w-4 text-slate-300" />
                      <span>On-Device Move Evaluator Engine</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Evaluates positions locally without server roundtrips. Computes centipawn evaluation gauges (+1.4) and classifies candidate lines into Best Move, Excellent, Good, Inaccuracy, Mistake, and Blunder.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FiActivity className="h-4 w-4 text-slate-300" />
                      <span>4 Bot Intelligence Tiers</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Calibrated heuristic depth levels: Beginner (800 ELO), Casual (1200 ELO), Club (1600 ELO), and Master (2000+ ELO). Each tier exhibits realistic opening choices and tactical combinational vision.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FiDatabase className="h-4 w-4 text-slate-300" />
                      <span>ludo-binge-offline-v2 State Model</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Turn-by-turn atomic persistence written via Expo FileSystem. If the app is interrupted by an incoming phone call or backgrounded, the session resumes precisely at the current active player turn.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FiActivity className="h-4 w-4 text-slate-300" />
                      <span>Relaxed vs. Tactical Heuristics</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Solo match bot logic offers two distinct AI behaviors: Relaxed (randomized legal moves) and Tactical (scored evaluation favoring yard unlocks, knockout bonuses, and safe star sanctuaries).
                    </p>
                  </div>
                </>
              )}

              <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2 md:col-span-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FiShield className="h-4 w-4 text-emerald-400" />
                  <span>Sandbox Isolation & Energy Budget</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Operates within strict native execution constraints. Physics loops and animation timers pause synchronously on application lifecycle blur events, maintaining zero battery overhead in standby mode.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: MECHANICS & RULES */}
          {activeTab === 'mechanics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isChess ? (
                <>
                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                    <h4 className="text-sm font-bold text-white">FIDE Law Compliance</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Strict enforcement of castling prerequisites, en passant pawn capture windows, promotion choices (Queen, Rook, Bishop, Knight), 3-fold repetition detection, and 50-move draw rules.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                    <h4 className="text-sm font-bold text-white">Time Controls & Clocks</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Configurable Untimed, Blitz, and Rapid clocks. Digital countdown timers synchronise accurately to delta intervals with tactile haptic move snapping.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2 md:col-span-2">
                    <h4 className="text-sm font-bold text-white">Interactive Chess Academy Curriculum</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Structured interactive lessons across: Foundations (Piece Movement & Special Rules), Tactical Motifs (Pins, Forks, Skewers, Discovered Attacks), Opening Principles (Center Control & King Safety), and Essential Endgames (King & Pawn, Opposition).
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                    <h4 className="text-sm font-bold text-white">Citadel Yard Deployment & Extra Rolls</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Pawns deploy from the quadrant citadel yard only upon rolling an exact <strong>6</strong>. A bonus roll is granted for rolling a 6, capturing an opponent token, or parking a pawn safely in the Home column.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                    <h4 className="text-sm font-bold text-white">Safe Star Sanctuaries & Knockouts</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      8 designated star-marked cells along the 52-tile circuit protect tokens from knockouts. Landing on opponent pawns in non-safe cells captures them back to their citadel yard.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2 md:col-span-2">
                    <h4 className="text-sm font-bold text-white">Stacked Pawns Chooser & Move Hints</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      When multiple tokens occupy the same tile, tapping brings up an on-board disambiguation chooser. Visual move hints highlight legal pawn advance options.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 3: COSMETICS & INVENTORY */}
          {activeTab === 'cosmetics' && (
            <div className="space-y-6">
              {isChess ? (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-3">
                    <h4 className="text-sm font-bold text-white">6 Master Staunton Board Themes</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { name: 'Tournament Walnut', desc: 'Classic polished walnut & ivory wood', price: 'Free' },
                        { name: 'Cyberpunk Neon', desc: 'Obsidian table with electric cyan & neon lime', price: '300 Coins' },
                        { name: 'Royal Emerald', desc: 'Deep emerald velvet felt & pale mint', price: '450 Coins' },
                        { name: 'Volcano Obsidian', desc: 'Molten magma basalt & glowing copper embers', price: '600 Coins' },
                        { name: 'Imperial Amethyst', desc: 'Velvet royal purple & soft lavender mist', price: '800 Coins' },
                        { name: 'Ocean Sapphire', desc: 'Deep abyss cobalt & arctic sea foam', price: '500 Coins' },
                      ].map((t, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{t.name}</span>
                            <span className="text-[10px] font-mono text-slate-300">{t.price}</span>
                          </div>
                          <p className="text-[11px] text-slate-400">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                    <h4 className="text-sm font-bold text-white">10 Player Profile Avatars</h4>
                    <p className="text-xs text-slate-400">Unlocked via earned gameplay coins:</p>
                    <div className="flex flex-wrap gap-2 pt-1 text-xl">
                      {['👑', '⚔️', '🛡️', '🧙‍♂️', '🦅', '🦁', '🐉', '🤖', '⚡', '🌟'].map((av, i) => (
                        <span key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                          {av}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-3">
                    <h4 className="text-sm font-bold text-white">8 Custom Board Arenas</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { name: 'Classic Arena', sub: 'Crisp white route & emerald trim (Free)' },
                        { name: 'Ember Lounge', sub: 'Smoky terracotta sunset light (Free)' },
                        { name: 'Deep Sea', sub: 'Ink-blue felt with steel edge (Free)' },
                        { name: 'Velvet Room', sub: 'Diamond citadels, brass violet arena (220 LD)' },
                        { name: 'Eclipse Suite', sub: 'Orbital bases & gold rings (500 LD)' },
                        { name: 'Neon Cyberpunk', sub: 'Synthwave laser grid & neon borders (450 LD)' },
                        { name: 'Royal Citadel', sub: 'Imperial gold trim & ruby mahogany (480 LD)' },
                        { name: 'Volcano Obsidian', sub: 'Charcoal felt & basalt magma glow (380 LD)' },
                      ].map((b, i) => (
                        <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                          <p className="text-xs font-bold text-white">{b.name}</p>
                          <p className="text-[10px] text-slate-400">{b.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                      <h4 className="text-sm font-bold text-white">10 Custom Dice Styles</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Ruby Classic, Carbon Black, Aurora Glass, Gilded Six, Neon Synthwave, Royal Imperial, Cyber Matrix, Glacier Prism, Nebula Relic, Obsidian Forge.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-2">
                      <h4 className="text-sm font-bold text-white">7 Sculpted Pawn Sets</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Club Original, Prism Collection (Cut-glass cores), Orbit Runners, Royal Court, Mech Sentinels, Phoenix Legion, Jade Blossoms.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SPECIFICATIONS & POLICIES */}
          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {game.features?.map((f, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#12131c] border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-mono text-slate-400">{f.label}</p>
                    <p className="text-xs font-bold text-white mt-0.5">{f.value}</p>
                  </div>
                  <FiCheck className="h-4 w-4 text-emerald-400" />
                </div>
              ))}

              <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-3 md:col-span-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Included Compilation Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {game.technologies?.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* High-Res Lightbox Modal */}
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
              className="relative max-w-md w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black"
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
                  alt="Full-Resolution Screen Inspection"
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

      {/* QR Modal */}
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        url={shareUrl}
        title={game.title}
      />
    </main>
  );
}
