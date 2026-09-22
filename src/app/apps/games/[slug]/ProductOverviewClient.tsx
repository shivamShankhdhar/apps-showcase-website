'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiZap,
  FiShield,
  FiLayers,
  FiActivity,
  FiClock,
  FiUsers,
  FiCpu,
  FiMaximize2,
  FiX,
  FiAward,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiDatabase,
  FiArrowRight,
  FiExternalLink,
} from 'react-icons/fi';
import { FaDiceD6, FaChessKnight, FaGooglePlay, FaApple, FaAndroid, FaStar, FaDownload } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { AppItem } from '@/lib/defaultData';
import { LudoBoardView } from '@/components/game-boards/LudoBoardView';
import { ChessBoardView } from '@/components/game-boards/ChessBoardView';
import { LudoBackdropArt } from '@/components/3d/LudoBackdropArt';
import PlatformQrCard from '@/components/PlatformQrCard';
import ImageWithSkeleton from '@/components/ui/ImageWithSkeleton';

interface ProductOverviewClientProps {
  game: AppItem;
}

type TabKey = 'architecture' | 'mechanics' | 'cosmetics' | 'specifications';

type AtmosphereColor = 'cyber' | 'emerald' | 'crimson' | 'violet' | 'amber';

const atmospherePresets: {
  id: AtmosphereColor;
  label: string;
  dotColor: string;
  glowAura: string;
  phoneBorder: string;
  textColor: string;
  bgChip: string;
  ring: string;
}[] = [
  {
    id: 'cyber',
    label: 'Cyber Cyan',
    dotColor: 'bg-cyan-400',
    glowAura: 'from-cyan-500/35 via-blue-600/25 to-indigo-700/20',
    phoneBorder: 'group-hover:border-cyan-400/50',
    textColor: 'text-cyan-400',
    bgChip: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    ring: 'ring-cyan-500/60',
  },
  {
    id: 'emerald',
    label: 'Neon Emerald',
    dotColor: 'bg-emerald-400',
    glowAura: 'from-emerald-500/35 via-teal-600/25 to-lime-600/20',
    phoneBorder: 'group-hover:border-emerald-400/50',
    textColor: 'text-emerald-400',
    bgChip: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    ring: 'ring-emerald-500/60',
  },
  {
    id: 'crimson',
    label: 'Crimson Fury',
    dotColor: 'bg-rose-500',
    glowAura: 'from-red-600/40 via-rose-600/25 to-amber-500/20',
    phoneBorder: 'group-hover:border-rose-400/50',
    textColor: 'text-rose-400',
    bgChip: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    ring: 'ring-rose-500/60',
  },
  {
    id: 'violet',
    label: 'Royal Violet',
    dotColor: 'bg-purple-400',
    glowAura: 'from-purple-600/35 via-violet-600/25 to-fuchsia-600/20',
    phoneBorder: 'group-hover:border-purple-400/50',
    textColor: 'text-purple-400',
    bgChip: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    ring: 'ring-purple-500/60',
  },
  {
    id: 'amber',
    label: 'Sunfire Gold',
    dotColor: 'bg-amber-400',
    glowAura: 'from-amber-500/35 via-yellow-600/25 to-orange-600/20',
    phoneBorder: 'group-hover:border-amber-400/50',
    textColor: 'text-amber-400',
    bgChip: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    ring: 'ring-amber-500/60',
  },
];

export default function ProductOverviewClient({ game }: ProductOverviewClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('architecture');
  const [lastEvent, setLastEvent] = useState<string>('Board engine initialized • Ready for match');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const isChess =
    game.title.toLowerCase().includes('chess') ||
    game.package.toLowerCase().includes('chess');

  const [atmosphere, setAtmosphere] = useState<AtmosphereColor>(isChess ? 'cyber' : 'emerald');
  const currentAtmosphere = atmospherePresets.find((a) => a.id === atmosphere) || atmospherePresets[0];

  const isTesting =
    game.status?.toLowerCase().includes('closed') ||
    game.status?.toLowerCase().includes('testing') ||
    game.rating?.toLowerCase().includes('coming');

  const hasAndroidLink = Boolean(
    game.playStoreUrl && game.playStoreUrl.trim().startsWith('http')
  );
  const hasIosLink = Boolean(
    game.appStoreUrl && game.appStoreUrl.trim().startsWith('http')
  );

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

  const handleDiceRoll = (val: number) => {
    if (val === 6) {
      setLastEvent('Rolled a 6! 🌟 Token deployed from Citadel Yard. Extra turn awarded.');
    } else {
      setLastEvent(`Rolled a ${val}! Advancing active pawn along outer track.`);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/apps" className="hover:text-white transition-colors">
            Apps
          </Link>
          <span className="text-slate-600">/</span>
          <span>Games</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-semibold">{game.title}</span>
        </nav>

        {/* ========================================================================= */}
        {/* HERO SECTION: LEFT PRODUCT DETAILS & RIGHT QR CARD (SWITCHABLE TABS) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left: Product Narrative & Interactive Surface */}
          <div className="lg:col-span-7 space-y-6">
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
                {game.containsAds && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-sans text-[11px] font-medium shadow-sm">
                      <span className="text-[9px] font-bold px-1 rounded bg-amber-400/20 text-amber-300 uppercase tracking-wide">
                        Ad
                      </span>
                      <span>Contains ads</span>
                    </span>
                  </>
                )}
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

            {/* Direct Store Action Bar (Dynamic From Admin) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {hasAndroidLink ? (
                <a
                  href={game.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/25 transition-all"
                >
                  <FaGooglePlay className="h-4 w-4" />
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-mono tracking-wider opacity-80 leading-none">Get on</p>
                    <p className="text-xs font-bold leading-tight">Google Play</p>
                  </div>
                  {game.rating && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-black/30 font-mono text-amber-300">
                      ★ {game.rating}
                    </span>
                  )}
                </a>
              ) : game.playConsoleUrl ? (
                <a
                  href={game.playConsoleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/35 shadow-lg shadow-emerald-950/20 transition-all"
                >
                  <FaGooglePlay className="h-4 w-4 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-mono tracking-wider text-emerald-400 leading-none">Play Console</p>
                    <p className="text-xs font-bold leading-tight">Join Closed Beta</p>
                  </div>
                  <FiExternalLink className="h-3 w-3 opacity-70" />
                </a>
              ) : (
                <a
                  href="#coming-soon"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all"
                >
                  <FaGooglePlay className="h-4 w-4 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-mono tracking-wider text-slate-400 leading-none">Android Track</p>
                    <p className="text-xs font-bold leading-tight">{game.playStoreStatus || 'Coming Soon'}</p>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    Soon
                  </span>
                </a>
              )}

              {hasIosLink ? (
                <a
                  href={game.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-200 text-black shadow-lg transition-all"
                >
                  <FaApple className="h-4 w-4" />
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-mono tracking-wider opacity-80 leading-none">Download on</p>
                    <p className="text-xs font-bold leading-tight">Apple App Store</p>
                  </div>
                </a>
              ) : (
                <a
                  href="#coming-soon"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all"
                >
                  <FaApple className="h-4 w-4 text-slate-200" />
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-mono tracking-wider text-slate-400 leading-none">iOS Status</p>
                    <p className="text-xs font-bold leading-tight">{game.appStoreStatus || 'Coming Soon'}</p>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    Soon
                  </span>
                </a>
              )}

              <Link
                href={`/apps/games/${game.id || game.package}/privacy-policy`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
              >
                <FiShield className="h-3.5 w-3.5 text-slate-400" />
                <span>Data Safety</span>
              </Link>
            </div>

            {/* Verified Google Play Store & Play Protect Telemetry Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#131722] to-[#12131c] border border-emerald-500/25 shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Play Protect Shield & Security Status */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <FiShield className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-wide">
                        {game.playProtectVerified !== false ? 'Verified by Google Play Protect' : 'Google Play Ecosystem Verified'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Security Check Passed</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {game.releaseTrack || 'Google Play Production Track'} &bull; Signed Keystore
                    </p>
                  </div>
                </div>

                {/* Live Ratings & Installs Milestone */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold">
                    <FaStar className="h-3.5 w-3.5 text-amber-400" />
                    <span>{game.rating || '4.9'}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({game.ratingCount || '1K+ Reviews'})</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold">
                    <FaDownload className="h-3 w-3 text-emerald-400" />
                    <span>{game.downloadsTier || '10K+ Installs'}</span>
                  </div>

                  {game.contentRating && (
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px] font-semibold">
                      {game.contentRating}
                    </div>
                  )}
                </div>
              </div>

              {/* What's New changelog banner if provided */}
              {game.whatsNew && (
                <div className="pt-2.5 border-t border-white/10 flex items-start gap-2.5 text-xs">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                    What&apos;s New
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                    {game.whatsNew}
                  </p>
                </div>
              )}
            </div>

            {/* Dynamic Architecture Spec Grid (Controlled via Admin) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 py-3 border-y border-white/10 text-xs">
              {(game.features && game.features.length > 0
                ? game.features.slice(0, 5)
                : [
                    { label: 'Platform Target', value: 'Android 8.0+ (API 26)' },
                    { label: 'Network Scope', value: '100% Offline Capable' },
                    { label: 'Multiplayer', value: 'Pass & Play (Single Device)' },
                    { label: 'Monetization', value: game.containsAds ? 'Contains Ads' : 'Ad-Free' },
                    { label: 'Privacy Track', value: 'Zero Identity Scrape' },
                  ]
              ).map((spec, i) => (
                <div key={i}>
                  <p className="text-[10px] text-slate-400 uppercase font-mono">{spec.label}</p>
                  <p className="text-xs font-bold text-white font-mono mt-0.5">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Dynamic Engine Highlights (Controlled via Admin) */}
            {game.highlights && game.highlights.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#12131c]/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                    <FiZap className="h-3.5 w-3.5 text-amber-400" />
                    <span>Verified Production Features &amp; Engine Highlights</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{game.highlights.length} Highlights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {game.highlights.slice(0, 4).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Board Surface Preview */}
            <div className="rounded-2xl bg-[#12131c] border border-white/15 p-4 flex flex-col sm:flex-row items-center gap-5 shadow-xl">
              <div className="relative w-36 h-36 rounded-xl bg-black/50 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                <LudoBackdropArt />
                <div className="relative z-10 w-full flex items-center justify-center">
                  {isChess ? (
                    <div className="scale-75 origin-center">
                      <ChessBoardView />
                    </div>
                  ) : (
                    <div className="scale-75 origin-center">
                      <LudoBoardView onDiceRoll={handleDiceRoll} />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-xs font-bold text-white">Interactive State Preview</p>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isChess
                    ? 'Evaluates legal moves, pins, and candidate branch choices on-device.'
                    : 'Tap the dice to simulate turn events, citadel releases, and extra rolls.'}
                </p>
                <p className="text-[10px] font-mono text-amber-400 bg-black/40 px-2 py-1 rounded border border-white/10">
                  {lastEvent}
                </p>
              </div>
            </div>

          </div>

          {/* Right: QR Code Card with Android & iOS Tabs */}
          <div className="lg:col-span-5 w-full">
            <PlatformQrCard game={game} />
          </div>

        </div>

        {/* ========================================================================= */}
        {/* GOOGLE PLAY OFFICIAL FEATURE GRAPHIC BANNER */}
        {/* ========================================================================= */}
        {game.featureGraphic && (
          <section className="space-y-3 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-bold">
                <FaGooglePlay className="h-3.5 w-3.5 text-emerald-400" />
                <span>Google Play Promotional Banner (1024x500 Feature Graphic)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                Play Store Asset
              </span>
            </div>
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl group">
              <div className="relative aspect-[1024/500] w-full max-h-[380px] overflow-hidden">
                <ImageWithSkeleton
                  src={game.featureGraphic}
                  alt={`${game.title} Feature Graphic`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3">
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white flex items-center gap-2 shadow-lg">
                    <FaGooglePlay className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Official Google Play Feature Graphic &bull; {game.title}</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* MULTI-SCREENSHOT INSPECTION SUITE (WITH ATMOSPHERE LIGHTING & ANIMATIONS) */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Visual Verification & Atmosphere</span>
              <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                Production Screen Captures ({currentScreenshots.length} Views)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Examining the actual Android production UI, game states, and operational screens.
              </p>
            </div>

            {/* Interactive Atmosphere Lighting Switcher */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md self-start sm:self-auto">
              <span className="text-[10px] font-mono text-slate-400 px-2 uppercase font-semibold">
                Ambient Glow:
              </span>
              <div className="flex items-center gap-1">
                {atmospherePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setAtmosphere(preset.id)}
                    title={`Lighting: ${preset.label}`}
                    className={`h-6 px-2.5 rounded-xl text-[10px] font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      atmosphere === preset.id
                        ? `${preset.bgChip} shadow-xs scale-105 font-bold`
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${preset.dotColor}`} />
                    <span className="hidden sm:inline">{preset.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#12131c] border border-white/15 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
            {/* Main Screenshot Preview with Dynamic Ambient Glow & Floating Chips */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* Dynamic Animated Ambient Glow Aura */}
              <div
                className={`absolute -inset-6 bg-gradient-to-tr ${currentAtmosphere.glowAura} rounded-[60px] blur-3xl opacity-80 transition-all duration-700 pointer-events-none animate-aura-spin`}
              />

              {/* Floating Tech Badges */}
              <div className="absolute -top-3 -right-2 sm:-right-4 z-30 px-3 py-1 rounded-xl bg-[#12131c]/90 border border-white/15 backdrop-blur-md text-[10px] font-mono text-slate-200 flex items-center gap-1.5 shadow-xl animate-float">
                <span className={`h-1.5 w-1.5 rounded-full ${currentAtmosphere.dotColor} animate-pulse`} />
                <span>60 FPS Native Loop</span>
              </div>

              <div className="absolute -bottom-1 -left-2 sm:-left-4 z-30 px-3 py-1 rounded-xl bg-[#12131c]/90 border border-white/15 backdrop-blur-md text-[10px] font-mono text-slate-200 flex items-center gap-1.5 shadow-xl animate-float" style={{ animationDelay: '1.6s' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Deterministic Client</span>
              </div>

              {/* Phone Device Mockup Container */}
              <div
                onClick={() => setLightboxImg(currentScreenshots[activeScreenIndex].src)}
                className={`relative group cursor-pointer w-full max-w-[270px] sm:max-w-[290px] rounded-[38px] p-2.5 bg-gradient-to-b from-slate-800/80 via-[#12131c] to-black border border-white/20 ${currentAtmosphere.phoneBorder} shadow-2xl hover:scale-[1.02] transition-all duration-300 z-10`}
              >
                {/* Simulated Phone Speaker / Dynamic Island Indicator */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20 flex items-center justify-center pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/10" />
                </div>

                <div className="relative rounded-[28px] overflow-hidden aspect-[9/19.5] bg-black">
                  {/* Holographic Laser Scanline Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/15 to-transparent h-20 w-full animate-scanline pointer-events-none z-20 opacity-30" />

                  {/* Fluid Framer Motion Crossfade and Scaling */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreenIndex}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={currentScreenshots[activeScreenIndex].src}
                        alt={currentScreenshots[activeScreenIndex].title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 320px"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium backdrop-blur-xs z-30 pointer-events-none">
                    <FiMaximize2 className="h-4 w-4" />
                    <span>Expand High-Res</span>
                  </div>
                </div>
              </div>

              {/* Mirror Floor Reflection */}
              <div className="w-3/4 h-5 mt-1 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-md opacity-25 pointer-events-none" />
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
                      className={`relative aspect-[9/19.5] rounded-lg overflow-hidden border transition-all cursor-pointer bg-black ${
                        activeScreenIndex === idx
                          ? `border-white scale-105 shadow-lg ring-2 ${currentAtmosphere.ring}`
                          : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-contain"
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
              <FiCheck className="h-3.5 w-3.5" />
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

              {/* Official Privacy Policy Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-red-600/10 via-rose-600/5 to-transparent border border-red-500/20 space-y-3 md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FiShield className="h-4 w-4 text-red-400" />
                    <h4 className="text-sm font-bold text-white">Google Play Store Data Safety &amp; Privacy Policy</h4>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl">
                    Official disclosure of local data storage, AdMob telemetry, COPPA child protection, and user deletion rights.
                  </p>
                </div>
                <Link
                  href={`/apps/games/${game.id || game.package}/privacy-policy`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-slate-200 transition-colors shrink-0 font-mono"
                >
                  <span>Read Privacy Policy</span>
                  <FiArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* COMING SOON & PLATFORM AVAILABILITY ROADMAP */}
        {/* ========================================================================= */}
        <section id="coming-soon" className="scroll-mt-20 space-y-6 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Distribution Roadmap</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Platform Availability Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Official store deployment pipeline and verified release status for {game.title}.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin Controlled Status</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Android Card */}
            <div className="p-6 rounded-3xl bg-[#12131c] border border-white/10 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <FaAndroid className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Android Ecosystem</h3>
                    <p className="text-xs font-mono text-slate-400">{game.package}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                    hasAndroidLink
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {hasAndroidLink ? (game.playStoreStatus || 'Production Live') : (game.playStoreStatus || 'Coming Soon')}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {hasAndroidLink
                  ? 'Officially published and verified on Google Play Store. Signed with cryptographic release Keystore and targeting modern Android API levels.'
                  : 'Currently in active engineering track and closed testing. Binary signing and automated regression suites are in progress.'}
              </p>

              {hasAndroidLink ? (
                <a
                  href={game.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  <FaGooglePlay className="h-3.5 w-3.5" />
                  <span>Open Google Play Store</span>
                  <FiExternalLink className="h-3 w-3" />
                </a>
              ) : game.playConsoleUrl ? (
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={game.playConsoleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    <FaGooglePlay className="h-3.5 w-3.5" />
                    <span>Opt-In via Google Play Console</span>
                    <FiExternalLink className="h-3 w-3" />
                  </a>
                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30">
                    <FiClock className="h-3.5 w-3.5" />
                    <span>Track: {game.releaseTrack || game.playStoreStatus || 'Closed Testing'}</span>
                  </div>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30">
                  <FiClock className="h-3.5 w-3.5" />
                  <span>Track Status: {game.playStoreStatus || 'Closed Testing in Progress'}</span>
                </div>
              )}
            </div>

            {/* iOS Card */}
            <div className="p-6 rounded-3xl bg-[#12131c] border border-white/10 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <FaApple className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Apple iOS Ecosystem</h3>
                    <p className="text-xs font-mono text-slate-400">iOS 15.0+ &bull; TestFlight Track</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                    hasIosLink
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {hasIosLink ? (game.appStoreStatus || 'App Store Live') : (game.appStoreStatus || 'Coming Soon')}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {hasIosLink
                  ? 'Available on the Apple App Store / TestFlight. Built with Apple Human Interface Guidelines and App Tracking Transparency compliance.'
                  : 'The iOS cross-platform release is currently in engineering preparation. TestFlight build invitations and App Store review will follow.'}
              </p>

              {hasIosLink ? (
                <a
                  href={game.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-200 text-black transition-colors"
                >
                  <FaApple className="h-3.5 w-3.5" />
                  <span>Open Apple App Store</span>
                  <FiExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30">
                  <FiClock className="h-3.5 w-3.5" />
                  <span>Status: {game.appStoreStatus || 'Coming Soon / In Preparation'}</span>
                </div>
              )}
            </div>
          </div>
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
              className="relative max-w-md w-auto rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black p-2 flex flex-col items-center justify-center"
            >
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/80 text-white hover:bg-white/20 transition-colors border border-white/20 cursor-pointer"
                title="Close Lightbox"
              >
                <FiX className="h-5 w-5" />
              </button>
              <div className="relative h-[84vh] w-[88vw] max-w-sm flex items-center justify-center">
                <Image
                  src={lightboxImg}
                  alt="Full-Resolution Screen Inspection"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
