import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiGlobe,
  FiChevronRight,
  FiSmartphone,
  FiZap,
  FiShield,
  FiArrowLeft,
  FiCheckCircle,
} from 'react-icons/fi';
import { FaGamepad, FaGooglePlay, FaStar } from 'react-icons/fa6';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';
import AppCard from '@/components/AppCard';

export const metadata: Metadata = {
  title: 'Android Mobile Games Arena - Chess Binge & Ludo Binge',
  description:
    'Play and explore production Android games developed by Shivam Shankhdhar: Chess Binge (multi-depth AI tactical engine) and Ludo Binge (real-time multiplayer).',
};

async function getGames(): Promise<AppItem[]> {
  try {
    if (isDbConfigured()) {
      const conn = await connectDB();
      if (conn) {
        const apps = await App.find({
          category: { $regex: /^games$/i },
        }).sort({ order: 1, createdAt: -1 });

        if (apps && apps.length > 0) {
          return JSON.parse(JSON.stringify(apps));
        }
      }
    }
  } catch (err) {
    console.error('Error loading games:', err);
  }

  return defaultApps.filter((a) => (a.category || '').toLowerCase() === 'games');
}

export default async function GamesPage() {
  const games = await getGames();

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-red-500/20 bg-[#12131c] text-slate-300 hover:text-red-400 transition-all shadow-xs"
          >
            <FiArrowLeft className="h-3.5 w-3.5 text-red-500" />
            <span>Back to All Apps</span>
          </Link>

          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Apps Hub
            </Link>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-white font-semibold">Games Showcase</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/15 text-red-400 border border-red-500/30">
            <FaGamepad className="h-3.5 w-3.5" />
            <span>Playable Android Titles</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Competitive <span className="text-gradient-red">Game Engines</span> & Multiplayers
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            High-performance mobile board games built with custom native rendering loops, Stockfish multi-depth AI evaluations, and low-latency real-time multiplayer.
          </p>
        </div>

        {/* Games Grid */}
        <div id="titles" className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Featured Game Titles ({games.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game) => (
              <AppCard key={game._id || game.id || game.package} app={game} />
            ))}
          </div>
        </div>

        {/* Engine Breakdown Box */}
        <div className="rounded-3xl border border-red-500/25 bg-[#12131c]/80 p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FiZap className="h-5 w-5 text-red-500" />
            <span>Built for Tournament Precision</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="space-y-2 p-4 rounded-2xl bg-black/40 border border-white/5">
              <p className="font-bold text-white text-sm">♟️ Chess Binge Engine</p>
              <p className="leading-relaxed text-slate-400">
                Implements strict FIDE move validation, fen board persistence, and multi-depth AI evaluation ranging from beginner bots to Grandmaster difficulty.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-black/40 border border-white/5">
              <p className="font-bold text-white text-sm">🎲 Ludo Binge Networking</p>
              <p className="leading-relaxed text-slate-400">
                Engineered with WebSocket synchronization for 4-player real-time online matchmaking, tactile haptic feedback, and local pass-and-play party modes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
