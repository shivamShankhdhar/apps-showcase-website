import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiSmartphone, FiShield, FiZap, FiCpu, FiCheckCircle } from 'react-icons/fi';
import { FaGamepad, FaChessKnight, FaDiceD6 } from 'react-icons/fa6';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';
import AppsPageClient from './AppsPageClient';

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
    console.error('Error fetching apps:', err);
  }

  return defaultApps;
}

export const metadata = {
  title: 'Mobile Applications Catalog | Binge Games Studio',
  description: 'Explore production Android gaming titles: Chess Binge (multi-depth AI tactical engine) and Ludo Binge (offline club & pass and play).',
};

export default async function AppsPage() {
  const apps = await getApps();

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-red-500/20 bg-[#12131c] text-slate-300 hover:text-red-400 transition-all text-xs sm:text-sm shadow-xs"
          >
            <FiArrowLeft className="h-3.5 w-3.5 text-red-500" />
            <span>Return to Overview</span>
          </Link>

          <Link
            href="/games"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-red-500/30 bg-red-600/10 text-red-400 hover:bg-red-600/20 text-xs font-semibold transition-all"
          >
            <FaGamepad className="h-3.5 w-3.5" />
            <span>Switch to Games Hub</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
            <FiSmartphone className="h-3.5 w-3.5 text-red-400" />
            <span>Mobile Products Catalog</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Mobile Games & <span className="text-gradient-red">Applications</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Engineered with 100% offline-first mechanics, local save persistence, custom haptic feedback, and zero data tracking policies. All applications are signed for the Google Play Store.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-2xl mx-auto">
            <div className="p-3 rounded-2xl bg-[#12131c] border border-red-500/20 text-center">
              <p className="text-lg font-black text-white">{apps.length}</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Active Releases</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#12131c] border border-red-500/20 text-center">
              <p className="text-lg font-black text-emerald-400">100%</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Offline-First</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#12131c] border border-red-500/20 text-center">
              <p className="text-lg font-black text-white">60 FPS</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Native Render</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#12131c] border border-red-500/20 text-center">
              <p className="text-lg font-black text-red-400">0 B</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Data Collected</p>
            </div>
          </div>
        </div>

        {/* Client Search & Card Grid */}
        <AppsPageClient initialApps={apps} />

        {/* Studio Guarantee Banner */}
        <div className="rounded-3xl bg-[#12131c] border border-red-500/20 p-8 text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex p-3 rounded-2xl bg-red-600/10 text-red-400 border border-red-500/20">
            <FiShield className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Binge Gaming Studio Commitment
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Every game published under the Binge banner is strictly offline-capable, respects user privacy through standard Google UMP consent, and contains no pay-to-win mechanics.
          </p>
        </div>
      </div>
    </main>
  );
}
