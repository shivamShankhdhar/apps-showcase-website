import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink,
  FiShield,
  FiCpu,
  FiZap,
  FiDatabase,
  FiClock,
  FiCode,
  FiActivity,
  FiLayers,
} from 'react-icons/fi';
import { FaGooglePlay, FaChessKnight, FaDiceD6 } from 'react-icons/fa6';
import Phone3DShowcase from '@/components/3d/Phone3DShowcase';
import ParticleMatrix from '@/components/3d/ParticleMatrix';
import { resolveMediaUrl } from '@/lib/driveStorage';

export default function HomePage() {
  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://shivamshankhdhar.dev';
  const chessScreenshot = resolveMediaUrl('/screenshots/chess/01_home_dashboard.png');
  const ludoScreenshot = resolveMediaUrl('/screenshots/ludo/01_ludo_home.jpg');

  return (
    <main className="relative bg-[#09090b] text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 pb-16 bg-developer-grid bg-radial-gradient">
        <ParticleMatrix />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Hero Overview */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Production Systems & Game Engines</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Engineered for Resilience. <br className="hidden sm:inline" />
                <span className="text-slate-400 font-semibold">Built for Offline Play.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Android software systems designed with compiled native logic, zero-cloud telemetry dependencies, and verified local state recovery.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-red-600 hover:bg-red-500 text-white shadow-sm transition-all"
              >
                <span>Browse Products Directory</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#architecture"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                <FiCpu className="h-4 w-4 text-slate-400" />
                <span>Architecture & Standards</span>
              </a>

              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <span>Developer Profile</span>
                <FiExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Engineering Metrics Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0 border-t border-white/10">
              <div>
                <p className="text-lg font-bold text-white font-mono">100%</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Offline Independent</p>
              </div>
              <div>
                <p className="text-lg font-bold text-emerald-400 font-mono">0 KB</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Telemetry Leaks</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white font-mono">60 Hz</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Delta-Time Loop</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-300 font-mono">API 26+</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Android Target</p>
              </div>
            </div>
          </div>

          {/* Right Interactive Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <Phone3DShowcase />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT HIGHLIGHTS (LEFT SUMMARY / RIGHT IMAGE) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        
        {/* Section Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Software Portfolio</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Software Deployments
            </h2>
          </div>
          <Link
            href="/apps"
            className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Full Directory</span>
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* ===================================================================== */}
        {/* PRODUCT 1: CHESS BINGE (Summary Left, Screenshot Right) */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Summary & Technical Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                  chess.binge
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">Production Release (v2.0.2)</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Chess Binge
              </h3>
              <p className="text-base text-slate-300 font-medium">
                On-device move evaluation and multi-tier tactical bot intelligence.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Designed to eliminate cloud roundtrips and cellular latency during competitive play. Built with compiled on-device move evaluation, 4 distinct ELO bot intelligence tiers (800 to 2000+), an evaluation radar for blunder detection, full FIDE compliance, and 6 custom Staunton themes.
            </p>

            {/* Structured Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-3.5 rounded-xl bg-[#12131c] border border-white/10 space-y-1">
                <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Engine Intelligence</p>
                <p className="text-xs font-bold text-white">4 Tiers (Beginner, Casual, Club, Master)</p>
                <p className="text-[11px] text-slate-400">Tactical move evaluation with blunder detection.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12131c] border border-white/10 space-y-1">
                <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Multiplayer Operation</p>
                <p className="text-xs font-bold text-white">Pass & Play (2 Players Offline)</p>
                <p className="text-[11px] text-slate-400">Single device play with custom clocks and sides.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12131c] border border-white/10 space-y-1">
                <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Interactive Academy</p>
                <p className="text-xs font-bold text-white">Tactics, Openings & Endgames</p>
                <p className="text-[11px] text-slate-400">Structured lessons with interactive board drills.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12131c] border border-white/10 space-y-1">
                <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Cosmetic Economy</p>
                <p className="text-xs font-bold text-white">6 Themes & 10 Avatars</p>
                <p className="text-[11px] text-slate-400">Unlocked strictly through earned match coins.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/apps/games/chess-binge"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-slate-200 transition-colors"
              >
                <span>View Complete Product Overview</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://play.google.com/store/apps/details?id=chess.binge"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                <FaGooglePlay className="h-3.5 w-3.5 text-emerald-400" />
                <span>Google Play Listing</span>
              </a>
            </div>
          </div>

          {/* Right: Device Screenshot Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[310px] rounded-[32px] p-2 bg-[#12131c] border border-white/15 shadow-2xl">
              <div className="relative rounded-[24px] overflow-hidden aspect-[9/16] bg-black">
                <Image
                  src={chessScreenshot}
                  alt="Chess Binge In-App Production Capture"
                  fill
                  className="object-cover"
                  sizes="320px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PRODUCT 2: LUDO BINGE (Summary Left, Screenshot Right) */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 border-t border-white/10">
          {/* Left: Summary & Technical Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                  ludo.binge
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">Closed Testing Track (v1.0.0)</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Ludo Binge
              </h3>
              <p className="text-base text-slate-300 font-medium">
                Deterministic turn mechanics and single-device local multiplayer.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Constructed with a native 60 FPS delta-time render loop and an offline-first state machine. Delivers 2–4 player pass-and-play matches, relaxed vs. tactical AI bot heuristics, 8 custom arena themes, 10 dice styles, and instant session resumption from local storage.
            </p>

            {/* Structured Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-3.5 rounded-xl bg-[#12131c] border border-white/10 space-y-1">
                <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Turn State Model</p>
                <p className="text-xs font-bold text-white">ludo-binge-offline-v2 Save Format</p>
                <p className="text-[11px] text-slate-400">Instant resume from last completed move.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12131c] border border-white/10 space-y-1">
                <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Session Configurations</p>
                <p className="text-xs font-bold text-white">Solo AI & 2–4 Player Pass & Play</p>
                <p className="text-[11px] text-slate-400">Custom names and color quadrants on 1 device.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12131c] border border-white/10 space-y-1">
                <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Cosmetic Inventory</p>
                <p className="text-xs font-bold text-white">8 Boards • 7 Pawns • 10 Dice</p>
                <p className="text-[11px] text-slate-400">Midnight Garden, Velvet Room, Eclipse Suite & more.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12131c] border border-white/10 space-y-1">
                <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Economy & Streaks</p>
                <p className="text-xs font-bold text-white">Daily Fortune Wheel</p>
                <p className="text-[11px] text-slate-400">LD Coins rewards, streak multiplier & 0 microtransactions.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/apps/games/ludo-binge"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-slate-200 transition-colors"
              >
                <span>View Complete Product Overview</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://play.google.com/store/apps/details?id=ludo.binge"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                <FaGooglePlay className="h-3.5 w-3.5 text-amber-400" />
                <span>Closed Testing Track</span>
              </a>
            </div>
          </div>

          {/* Right: Device Screenshot Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[310px] rounded-[32px] p-2 bg-[#12131c] border border-white/15 shadow-2xl">
              <div className="relative rounded-[24px] overflow-hidden aspect-[9/16] bg-black">
                <Image
                  src={ludoScreenshot}
                  alt="Ludo Binge In-App Production Capture"
                  fill
                  className="object-cover"
                  sizes="320px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* ARCHITECTURE & STANDARDS SECTION */}
      {/* ========================================================================= */}
      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-t border-white/10">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Engineering Philosophy</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Architectural Standards & Principles
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Our codebase is built on principles of client autonomy, predictable battery utilization, and strict avoidance of exploitative monetization patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200">
              <FiDatabase className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Local-First Storage</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Game state serializes synchronously to device storage. Sudden process termination, incoming phone calls, or app switching will never corrupt or forfeit match progress.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200">
              <FiClock className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Controlled Power Budget</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Delta-time render updates operate exclusively when the game surface is foregrounded. Physics timers and board updates immediately suspend when minimized to conserve battery.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200">
              <FiShield className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Zero Identity Harvester</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Games require no mandatory social account sign-ups, phone numbers, or background contact scraping. Advertising complies strictly with Google UMP consent standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12131c] border border-white/10 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200">
              <FiCode className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Signed AAB Binaries</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every release is compiled as an optimized Android App Bundle (AAB) using ProGuard bytecode optimization and strict Android Keystore signing keys.
            </p>
          </div>
        </div>
      </section>

      {/* Directory CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="rounded-2xl bg-[#12131c] border border-white/10 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Explore the Software Directory
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Access release documentation, build targets, and interactive demonstrations.
            </p>
          </div>

          <Link
            href="/apps"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors shrink-0"
          >
            <span>Open Products Directory</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
