import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiSmartphone,
  FiZap,
  FiShield,
  FiCpu,
  FiLayers,
  FiCheckCircle,
  FiExternalLink,
  FiArrowRight,
  FiActivity,
  FiClock,
  FiStar,
  FiLock,
  FiTrendingUp,
  FiCheck,
} from 'react-icons/fi';
import { FaGamepad, FaGooglePlay, FaDiceD6, FaChessKnight } from 'react-icons/fa6';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';
import Phone3DShowcase from '@/components/3d/Phone3DShowcase';
import ParticleMatrix from '@/components/3d/ParticleMatrix';
import { resolveMediaUrl } from '@/lib/driveStorage';

async function getApps(): Promise<AppItem[]> {
  try {
    if (isDbConfigured()) {
      const conn = await connectDB();
      if (conn) {
        const apps = await App.find().sort({ order: 1, createdAt: -1 });
        if (apps && apps.length > 0) {
          return JSON.parse(JSON.stringify(apps));
        }
      }
    }
  } catch (err) {
    console.error('Error fetching apps from MongoDB:', err);
  }
  return defaultApps;
}

export default async function HomePage() {
  const apps = await getApps();
  const gamesCount = apps.filter((a) => (a.category || '').toLowerCase() === 'games').length;
  const appsCount = apps.filter((a) => (a.category || '').toLowerCase() === 'apps').length;
  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://shivamshankhdhar.dev';

  const ludoScreenshot = resolveMediaUrl('/screenshots/ludo_gameplay.jpg');
  const chessScreenshot = resolveMediaUrl('/screenshots/chess_gameplay.jpg');
  const flowtaskScreenshot = resolveMediaUrl('/screenshots/flowtask_screen.jpg');
  const devlensScreenshot = resolveMediaUrl('/screenshots/devlens_screen.jpg');

  return (
    <main className="relative bg-[#09090b] text-slate-100 overflow-hidden">
      
      {/* 3D Animated Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 bg-developer-grid bg-radial-gradient">
        <ParticleMatrix />

        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Google Play Production & Closed Testing Releases</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
                Next-Gen <span className="text-gradient-red">Mobile Apps</span> & Games
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium">
                Engineered by Shivam Shankhdhar
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore high-performance Android applications built with React Native, local Stockfish AI chess engines, 60 FPS real-time board loops, and zero-tracking sandboxed databases.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/games"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all"
              >
                <FaGamepad className="h-4 w-4" />
                <span>Play Games Showcase</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/apps"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-white/5 hover:bg-red-500/15 text-white hover:text-red-400 border border-red-500/30 transition-all shadow-sm"
              >
                <FiSmartphone className="h-4 w-4 text-red-500" />
                <span>Browse Applications</span>
              </Link>

              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <span>Portfolio</span>
                <FiExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Live Stats Pill Grid */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-[#12131c]/70 border border-red-500/20 backdrop-blur-md text-center lg:text-left">
                <p className="text-xl font-black text-white">{gamesCount} Games</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Playable Hub</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#12131c]/70 border border-red-500/20 backdrop-blur-md text-center lg:text-left">
                <p className="text-xl font-black text-white">{appsCount} Apps</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Productivity</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#12131c]/70 border border-red-500/20 backdrop-blur-md text-center lg:text-left">
                <p className="text-xl font-black text-red-400">60 FPS</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Native Loop</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#12131c]/70 border border-red-500/20 backdrop-blur-md text-center lg:text-left">
                <p className="text-xl font-black text-emerald-400">Zero</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Data Harvest</p>
              </div>
            </div>

          </div>

          {/* Right 3D Interactive Phone Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <Phone3DShowcase />
          </div>

        </div>
      </section>

      {/* Engineering Highlights Ribbon */}
      <section className="border-y border-red-500/20 bg-[#0d0e17]/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <FiZap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Signed Android AABs</h4>
              <p className="text-xs text-slate-400 mt-0.5">Optimized with ProGuard bytecode shrinking and resource compression.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Privacy Compliant</h4>
              <p className="text-xs text-slate-400 mt-0.5">Sandboxed local storage. No user tracking, analytics harvesting, or data resale.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <FiCpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">AI & Real-Time Sync</h4>
              <p className="text-xs text-slate-400 mt-0.5">Stockfish multi-depth move engines & low-latency WebSocket multiplayer.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <FiLayers className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Google AdMob Verified</h4>
              <p className="text-xs text-slate-400 mt-0.5">IAB TCF v2.2 consent compliance with official app-ads.txt validation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT SPOTLIGHT 1: LUDO BINGE (Business Style Showcase) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="rounded-3xl bg-[#12131c] border-2 border-red-500/30 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden">
          
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Product Screenshot Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-[270px] sm:max-w-[290px] rounded-[36px] p-2 bg-gradient-to-b from-[#2a2c3d] via-[#1a1b26] to-[#0c0d14] border-2 border-red-500/30 shadow-2xl shadow-red-600/25 hover:scale-[1.02] transition-transform duration-300">
              <div className="relative rounded-[28px] overflow-hidden aspect-[9/16] bg-black">
                <Image
                  src={ludoScreenshot}
                  alt="Ludo Binge Production Gameplay Screenshot"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            </div>
          </div>

          {/* Right: Business Product Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/15 text-red-400 border border-red-500/30">
                <FaDiceD6 className="h-3.5 w-3.5 text-amber-400" />
                <span>Featured Game Title</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Ludo Binge
              </h2>
              <p className="text-base sm:text-lg font-semibold text-red-400">
                Competitive 4-Player Board Gaming with Sub-35ms WebSocket Latency
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Designed from the ground up for low-latency multiplayer matches. Features an authentic 15x15 vectorized board layout, rotating celestial astrolabe backdrop artwork, 3D torque-based physics dice, and seamless offline AI bot fallbacks.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Binary WebSocket state synchronization at 60 FPS</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>3D animated physics dice with golden aura glow</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Safe star sanctuaries & knockout bonus roll mechanics</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Instant private room codes for friends & family</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/games/ludo-binge"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <span>View Ludo Product Page</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/games"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <FaGamepad className="h-4 w-4 text-red-500" />
                <span>All Games</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT SPOTLIGHT 2: CHESS BINGE (Business Style Showcase) */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="rounded-3xl bg-[#12131c] border-2 border-red-500/30 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Product Narrative */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600/15 text-rose-400 border border-rose-500/30">
                <FaChessKnight className="h-3.5 w-3.5 text-rose-400" />
                <span>Grandmaster Tactical Engine</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Chess Binge
              </h2>
              <p className="text-base sm:text-lg font-semibold text-rose-400">
                Stockfish 16 Engine with On-Device WASM Centipawn Analysis
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Analyze positions with grandmaster precision. Powered by a local WebAssembly-compiled Stockfish 16 engine with configurable calculation depth up to 20 plies. FIDE rules compliant with Blitz, Rapid, Bullet timers, and 1,000+ tactical puzzles.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Real-time position evaluation gauge (+1.4)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>1,000+ progressive ELO tactical exercise puzzles</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Full FIDE standard rules (En Passant, Castling, Draws)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Standard PGN move history export & match review</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/games/chess-binge"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <span>View Chess Product Page</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/games"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <FaGamepad className="h-4 w-4 text-rose-500" />
                <span>All Games</span>
              </Link>
            </div>
          </div>

          {/* Right: Product Screenshot Mockup */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative group w-full max-w-[270px] sm:max-w-[290px] rounded-[36px] p-2 bg-gradient-to-b from-[#2a2c3d] via-[#1a1b26] to-[#0c0d14] border-2 border-rose-500/30 shadow-2xl shadow-rose-600/25 hover:scale-[1.02] transition-transform duration-300">
              <div className="relative rounded-[28px] overflow-hidden aspect-[9/16] bg-black">
                <Image
                  src={chessScreenshot}
                  alt="Chess Binge Production Gameplay Screenshot"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT SPOTLIGHT 3: DEVELOPER PRODUCTIVITY (FlowTask & DevLens) */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="rounded-3xl bg-[#12131c] border-2 border-red-500/30 p-8 sm:p-12 shadow-2xl space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-600/15 text-cyan-400 border border-cyan-500/30">
                <FiSmartphone className="h-3.5 w-3.5" />
                <span>Developer Productivity Suite</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                FlowTask & DevLens Utilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Engineered for engineers who require zero-lag encrypted local storage, ambient focus timers, and live hardware sensor profiling.
              </p>
            </div>

            <Link
              href="/apps"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border border-cyan-500/30 transition-all shrink-0"
            >
              <span>Explore All Applications Catalog</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* FlowTask Card */}
            <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[9/12] w-full max-w-[240px] mx-auto border border-white/10 shadow-xl">
                  <Image
                    src={flowtaskScreenshot}
                    alt="FlowTask Mobile Screenshot"
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FiZap className="text-amber-400 h-5 w-5" />
                    <span>FlowTask &bull; Kanban & Focus Timer</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Offline-first encrypted SQLite database with circular Pomodoro timer and markdown checklists.
                  </p>
                </div>
              </div>
              <Link
                href="/apps/flow-task"
                className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5"
              >
                <span>View FlowTask Details & Specs &rarr;</span>
              </Link>
            </div>

            {/* DevLens Card */}
            <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[9/12] w-full max-w-[240px] mx-auto border border-white/10 shadow-xl">
                  <Image
                    src={devlensScreenshot}
                    alt="DevLens Mobile Screenshot"
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FiCpu className="text-cyan-400 h-5 w-5" />
                    <span>DevLens &bull; Hardware & Network Telemetry</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Real-time 60 FPS CPU, GPU, and RAM telemetry graphs with HTTP/HTTPS traffic packet inspection.
                  </p>
                </div>
              </div>
              <Link
                href="/apps/dev-lens"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
              >
                <span>View DevLens Details & Specs &rarr;</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* ENTERPRISE QUALITY & ARCHITECTURE COMPARISON MATRIX */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold text-red-400 uppercase tracking-wider">
            Architecture Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Engineering Standard of Excellence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            How our production mobile titles compare against typical consumer ad-supported mobile software.
          </p>
        </div>

        <div className="rounded-3xl bg-[#12131c] border border-red-500/25 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Metric & Feature</th>
                  <th className="py-4 px-6 text-red-400 font-bold">Shivam Apps Hub Standard</th>
                  <th className="py-4 px-6 text-slate-400">Generic Market Apps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">User Privacy & Tracking</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>Zero Data Harvesting & Sandboxed SQLite</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Aggressive tracking & resale SDKs</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Multiplayer Latency</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>&lt;35ms Real-time Binary WebSockets</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">High-latency 300ms HTTP polling</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Ad Experience</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>Clean & Minimal (No forced video takeovers)</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Frequent unskippable full-screen ads</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Engine Performance</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>60 FPS Native delta-time render loops</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Sluggish embedded webview wrappers</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Offline Availability</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>Full Offline Mode with Heuristic AI bots</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Refuses to launch without internet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TESTER REVIEWS & SOCIAL PROOF */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold text-red-400 uppercase tracking-wider">
            User Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Trusted by Mobile Gamers & Engineers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &ldquo;Ludo Binge handles network drops so gracefully. When my subway loses signal, the local bot immediately maintains the turn order without kicking me from the match.&rdquo;
            </p>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Aarav M.</span>
              <span className="text-slate-500 font-mono text-[10px]">Closed Tester &bull; Pixel 8 Pro</span>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &ldquo;Having Stockfish 16 compiled locally with WebAssembly is game changing for offline tactical practice. The live evaluation curve gives instant feedback on my mistakes.&rdquo;
            </p>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Vikram S.</span>
              <span className="text-slate-500 font-mono text-[10px]">Chess Enthusiast &bull; Galaxy S23</span>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &ldquo;DevLens saved me hours debugging mobile network payloads. The 60 FPS telemetry graph showed a memory leak in my app in seconds.&rdquo;
            </p>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Elena R.</span>
              <span className="text-slate-500 font-mono text-[10px]">Android Engineer &bull; OnePlus 11</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CONVERSION CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-[40px] bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-10 sm:p-16 shadow-2xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-developer-grid opacity-20 pointer-events-none" />

          <div className="space-y-4 max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Experience Production Mobile Software?
            </h2>
            <p className="text-sm sm:text-base text-rose-100 max-w-xl mx-auto">
              Download games and utilities directly from Google Play, or join the closed testing group for early preview releases.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              href="/games"
              className="px-8 py-4 rounded-2xl font-bold text-sm bg-white text-slate-950 hover:bg-slate-100 shadow-xl transition-all cursor-pointer"
            >
              Play Games Showcase
            </Link>

            <Link
              href="/apps"
              className="px-8 py-4 rounded-2xl font-bold text-sm bg-black/40 hover:bg-black/60 text-white border border-white/20 shadow-xl transition-all cursor-pointer"
            >
              Browse Applications Catalog
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
