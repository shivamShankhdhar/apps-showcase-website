import React from 'react';
import Link from 'next/link';
import {
  FiSmartphone,
  FiZap,
  FiShield,
  FiCpu,
  FiLayers,
  FiCheckCircle,
  FiExternalLink,
  FiArrowRight,
  FiCode,
} from 'react-icons/fi';
import { FaGamepad, FaGooglePlay, FaDiceD6, FaChessKnight } from 'react-icons/fa6';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';
import Phone3DShowcase from '@/components/3d/Phone3DShowcase';
import ParticleMatrix from '@/components/3d/ParticleMatrix';

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

  return (
    <main className="relative bg-[#09090b] text-slate-100 overflow-hidden">
      
      {/* 3D Animated Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 bg-developer-grid bg-radial-gradient">
        {/* Background Canvas Particles */}
        <ParticleMatrix />

        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Google Play Production & Closed Testing Track</span>
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
              Experience production Android applications engineered with React Native, Expo, and low-latency native modules. Featuring Stockfish AI chess engines, 60 FPS real-time board loops, and privacy-first local storage.
            </p>

            {/* Hero CTAs: Separated Dedicated Page Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/games"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all"
              >
                <FaGamepad className="h-4 w-4" />
                <span>Play Games Showcase</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/apps"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-white/5 hover:bg-red-500/15 text-white hover:text-red-400 border border-red-500/30 transition-all shadow-sm"
              >
                <FiSmartphone className="h-4 w-4 text-red-500" />
                <span>Browse Applications</span>
              </Link>

              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
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
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Board Loop</p>
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

      {/* Two Dedicated Hub Portals (Replacing direct in-page listing) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
            <FiLayers className="h-3.5 w-3.5" />
            <span>Dedicated Hubs</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Explore the <span className="text-gradient-red">Ecosystem</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Select a dedicated showcase below to explore deep technical specifications, live rules, and Google Play downloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Portal Card 1: Games Hub */}
          <div className="rounded-3xl bg-[#12131c] border-2 border-red-500/30 hover:border-red-500/60 p-8 sm:p-10 shadow-2xl transition-all space-y-6 group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-red-600/20 to-rose-600/20 border border-red-500/30 flex items-center justify-center text-3xl shadow-inner">
                  <FaGamepad className="text-red-400 h-8 w-8" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/30 font-mono">
                  {gamesCount} Playable Titles
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-red-400 transition-colors">
                  Playable Games Hub
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
                  Ludo Binge &bull; Chess Binge &bull; WebSocket Arena
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Featuring authentic 15x15 vectorized Ludo boards, rotating celestial astrolabe backdrop artwork, real-time 3D dice physics, and local Stockfish AI analysis engines.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-300">
                  ⚡ 60 FPS Engine
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-300">
                  🌐 WebSockets
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-300">
                  ♟ Stockfish 16
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 relative z-10">
              <Link
                href="/games"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <span>Enter Games Hub</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Portal Card 2: Applications Catalog */}
          <div className="rounded-3xl bg-[#12131c] border-2 border-red-500/30 hover:border-red-500/60 p-8 sm:p-10 shadow-2xl transition-all space-y-6 group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl group-hover:bg-cyan-600/20 transition-all pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-3xl shadow-inner">
                  <FiSmartphone className="text-cyan-400 h-8 w-8" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  {appsCount} Production Apps
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">
                  Mobile Applications
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
                  FlowTask &bull; DevLens &bull; Utilities
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Developer utilities and privacy-conscious productivity tools with offline-first SQLite encryption, live HTTP packet telemetry, and zero tracking policies.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-300">
                  🔒 SQLite AES-256
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-300">
                  ⚡ 60 FPS Telemetry
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-300">
                  🛡️ Zero Trackers
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 relative z-10">
              <Link
                href="/apps"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm bg-white/5 hover:bg-cyan-500/15 text-white hover:text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
              >
                <span>Browse Applications Catalog</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
