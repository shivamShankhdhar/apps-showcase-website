import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiSmartphone, FiShield, FiZap, FiCpu, FiCheckCircle } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa6';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';
import AppsPageClient from './AppsPageClient';

async function getApps(): Promise<AppItem[]> {
  try {
    if (isDbConfigured()) {
      const conn = await connectDB();
      if (conn) {
        const apps = await App.find({
          category: { $regex: new RegExp('^apps$', 'i') },
        }).sort({ order: 1, createdAt: -1 });

        if (apps && apps.length > 0) {
          return JSON.parse(JSON.stringify(apps));
        }
      }
    }
  } catch (err) {
    console.error('Error fetching apps:', err);
  }

  return defaultApps.filter((a) => (a.category || '').toLowerCase() === 'apps');
}

export const metadata = {
  title: 'Android Applications Catalog | Shivam Apps Hub',
  description: 'Explore production Android applications designed for developer productivity, task management, and system telemetry.',
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
            <span>Dedicated Mobile Applications Catalog</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Developer & <span className="text-gradient-red">Productivity Apps</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Engineered with offline-first SQLite encryption, real-time hardware telemetry, and zero data tracking policies. All apps are optimized for low battery overhead and signed for the Google Play Store.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-2xl mx-auto">
            <div className="p-3 rounded-2xl bg-[#12131c] border border-red-500/20 text-center">
              <p className="text-lg font-black text-white">{apps.length}</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Active Apps</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#12131c] border border-red-500/20 text-center">
              <p className="text-lg font-black text-emerald-400">100%</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Offline Ready</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#12131c] border border-red-500/20 text-center">
              <p className="text-lg font-black text-white">AES-256</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Local Storage</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#12131c] border border-red-500/20 text-center">
              <p className="text-lg font-black text-red-400">0 B</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Data Collected</p>
            </div>
          </div>
        </div>

        {/* Client Search & Card Grid */}
        <AppsPageClient initialApps={apps} />

        {/* Bottom Cross-Hub Callout */}
        <div className="rounded-3xl bg-gradient-to-r from-red-600/15 via-[#12131c] to-rose-600/15 border border-red-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <FaGamepad className="h-5 w-5 text-red-400" />
              <span>Looking for Interactive Board Games?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Check out Ludo Binge and Chess Binge featuring 60 FPS real-time WebSockets and Stockfish AI.
            </p>
          </div>

          <Link
            href="/games"
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 shrink-0 transition-all"
          >
            Visit Games Showcase &rarr;
          </Link>
        </div>

      </div>
    </main>
  );
}
