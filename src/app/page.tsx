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
  FiAward,
  FiBookOpen,
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
  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://shivamshankhdhar.dev';

  const ludoScreenshot = resolveMediaUrl('/screenshots/ludo/01_ludo_home.jpg');
  const chessScreenshot = resolveMediaUrl('/screenshots/chess/01_home_dashboard.png');

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
              <span>Google Play Production & Closed Testing Titles</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
                Premium <span className="text-gradient-red">Mobile Games</span> & Apps
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium">
                Engineered by Shivam Shankhdhar
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore production Android board games engineered with 100% offline-first architectures, 4-tier tactical bot intelligence, 2–4 player pass-and-play mechanics, and zero pay-to-win progression.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/games/chess-binge"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all"
              >
                <FaChessKnight className="h-4 w-4" />
                <span>Chess Binge (v2.0.2)</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/games/ludo-binge"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-white/5 hover:bg-red-500/15 text-white hover:text-red-400 border border-red-500/30 transition-all shadow-sm"
              >
                <FaDiceD6 className="h-4 w-4 text-amber-400" />
                <span>Ludo Binge (Testing)</span>
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
                <p className="text-xl font-black text-white">2 Games</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Production Ready</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#12131c]/70 border border-red-500/20 backdrop-blur-md text-center lg:text-left">
                <p className="text-xl font-black text-emerald-400">100%</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Offline-First</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#12131c]/70 border border-red-500/20 backdrop-blur-md text-center lg:text-left">
                <p className="text-xl font-black text-red-400">60 FPS</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Native Render</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#12131c]/70 border border-red-500/20 backdrop-blur-md text-center lg:text-left">
                <p className="text-xl font-black text-amber-400">Zero</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Pay-to-Win</p>
              </div>
            </div>
          </div>

          {/* Right 3D Interactive Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <Phone3DShowcase />
          </div>
        </div>
      </section>

      {/* Engineering Standards Ribbon */}
      <section className="border-y border-red-500/20 bg-[#0d0e17]/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <FiZap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Signed Android AABs</h4>
              <p className="text-xs text-slate-400 mt-0.5">Signed packages with ProGuard optimization and API 26+ target compatibility.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Privacy Sandboxed</h4>
              <p className="text-xs text-slate-400 mt-0.5">Zero account friction, no tracking analytics, and IAB TCF v2.2 consent compliance.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <FiCpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">4-Tier Bot AI & Analysis</h4>
              <p className="text-xs text-slate-400 mt-0.5">Multi-depth tactical bots, blunder detection radar, and heuristic scoring engines.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <FiLayers className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Cosmetic Progression</h4>
              <p className="text-xs text-slate-400 mt-0.5">Unlock luxury boards, custom dice, and tokens strictly via earned gameplay coins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT SPOTLIGHT 1: CHESS BINGE */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="rounded-3xl bg-[#12131c] border-2 border-red-500/30 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Product Screenshot Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-[270px] sm:max-w-[290px] rounded-[36px] p-2 bg-gradient-to-b from-[#2a2c3d] via-[#1a1b26] to-[#0c0d14] border-2 border-red-500/30 shadow-2xl shadow-red-600/25 hover:scale-[1.02] transition-transform duration-300">
              <div className="relative rounded-[28px] overflow-hidden aspect-[9/16] bg-black">
                <Image
                  src={chessScreenshot}
                  alt="Chess Binge In-App Production Screenshot"
                  fill
                  className="object-cover"
                  sizes="320px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right: Product Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/15 text-red-400 border border-red-500/30">
                <FaChessKnight className="h-3.5 w-3.5 text-rose-400" />
                <span>Google Play Production &bull; chess.binge</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Chess Binge
              </h2>
              <p className="text-base sm:text-lg font-semibold text-rose-400">
                Grandmaster Tactical Engine, Move Evaluation & 4 Bot Tiers
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Engineered for both beginners and tournament players. Features 4 distinct AI bot tiers (Beginner 800 ELO to Master 2000+ ELO), local 2-player Pass & Play duels, comprehensive Chess Academy lessons, move blunder detection, and 6 luxury Staunton themes.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>4 Bot Intelligence Tiers (Beginner, Casual, Club, Master)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Pro Move Evaluator & Evaluation Radar graph</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Chess Academy lessons (Openings, Tactics & Endgames)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>6 Luxury Staunton themes & 10 collectible avatars</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/games/chess-binge"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <span>View Full Chess Product Page</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://play.google.com/store/apps/details?id=chess.binge"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <FaGooglePlay className="h-4 w-4 text-emerald-400" />
                <span>Play Store Listing</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT SPOTLIGHT 2: LUDO BINGE */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="rounded-3xl bg-[#12131c] border-2 border-red-500/30 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Product Narrative */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-600/15 text-amber-400 border border-amber-500/30">
                <FaDiceD6 className="h-3.5 w-3.5 text-amber-400" />
                <span>Google Play Closed Track &bull; ludo.binge</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Ludo Binge
              </h2>
              <p className="text-base sm:text-lg font-semibold text-amber-400">
                Offline Club, 2–4 Player Pass & Play, 8 Boards & 10 Dice Styles
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              The premier offline Ludo club. Play solo matches against Relaxed or Tactical bot AI heuristics, or gather 2 to 4 players on a single device with Pass & Play. Features 8 custom arena themes, 10 dice styles, 7 pawn sets, and daily lucky wheel rewards.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Solo Game vs AI (Relaxed & Tactical AI modes)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Pass & Play on 1 Phone for 2, 3, or 4 Players</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>8 Arena Themes (Midnight Garden, Velvet Room, Eclipse Suite)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <FiCheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>10 Custom Dice Varieties & 7 Sculpted Pawn Collections</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/games/ludo-binge"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <span>View Full Ludo Product Page</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://play.google.com/store/apps/details?id=ludo.binge"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <FaGooglePlay className="h-4 w-4 text-amber-400" />
                <span>Closed Testing Track</span>
              </a>
            </div>
          </div>

          {/* Right: Product Screenshot Mockup */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative group w-full max-w-[270px] sm:max-w-[290px] rounded-[36px] p-2 bg-gradient-to-b from-[#2a2c3d] via-[#1a1b26] to-[#0c0d14] border-2 border-amber-500/30 shadow-2xl shadow-amber-600/25 hover:scale-[1.02] transition-transform duration-300">
              <div className="relative rounded-[28px] overflow-hidden aspect-[9/16] bg-black">
                <Image
                  src={ludoScreenshot}
                  alt="Ludo Binge In-App Production Screenshot"
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
            How our Binge Gaming franchise compares against typical market ad-cluttered mobile games.
          </p>
        </div>

        <div className="rounded-3xl bg-[#12131c] border border-red-500/25 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Metric & Feature</th>
                  <th className="py-4 px-6 text-red-400 font-bold">Binge Gaming Franchise</th>
                  <th className="py-4 px-6 text-slate-400">Generic Market Games</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Offline Playability</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>100% Offline-First (No Internet Required)</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Requires constant cellular connectivity</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Account Friction</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>Zero Account Required &bull; Instant Play</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Forced social logins & phone numbers</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Fair Play & Economy</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>Zero Pay-to-Win &bull; Earned Coin Progression</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Aggressive paywalls & dice odds manipulation</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Ad Experience</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>Google UMP Consent & Optional Rewarded Hints</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Forced unskippable 30s ad popups every move</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Graphics & Render Loop</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>60 FPS Native Board Loop & Tactile Haptics</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Stuttering 30 FPS web-view wrappers</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Save State Integrity</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" />
                    <span>Instant Resume from Last Turn via FileSystem</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Matches forfeit if app is minimized</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-8 sm:p-14 text-center space-y-6 shadow-2xl shadow-red-600/30">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Experience Binge Gaming?
          </h2>
          <p className="text-base sm:text-lg text-rose-100 max-w-2xl mx-auto font-medium">
            Download our verified Android releases on Google Play or explore technical breakdowns.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/games/chess-binge"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-black text-white font-bold text-sm hover:bg-slate-900 transition-all shadow-xl"
            >
              <FaChessKnight className="h-4 w-4 text-rose-400" />
              <span>Explore Chess Binge</span>
            </Link>

            <Link
              href="/games/ludo-binge"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md transition-all border border-white/20"
            >
              <FaDiceD6 className="h-4 w-4 text-amber-300" />
              <span>Explore Ludo Binge</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
