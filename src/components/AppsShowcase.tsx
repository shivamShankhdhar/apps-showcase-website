'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiFilter, FiSmartphone, FiArrowRight } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa6';
import { AppItem } from '@/lib/defaultData';
import AppCard from './AppCard';

interface AppsShowcaseProps {
  initialApps: AppItem[];
}

export default function AppsShowcase({ initialApps }: AppsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');

    // Make sure Games is placed after All
    let hasGames = false;
    initialApps.forEach((a) => {
      if (a.category?.toLowerCase() === 'games') {
        hasGames = true;
      } else if (a.category) {
        cats.add(a.category);
      }
    });

    const list = ['All'];
    if (hasGames) list.push('Games');
    Array.from(cats)
      .filter((c) => c !== 'All' && c.toLowerCase() !== 'games')
      .forEach((c) => list.push(c));
    return list;
  }, [initialApps]);

  const filteredApps = useMemo(() => {
    return initialApps.filter((app) => {
      const matchesCategory =
        activeCategory === 'All' ||
        app.category?.toLowerCase() === activeCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.title.toLowerCase().includes(q) ||
        app.tagline.toLowerCase().includes(q) ||
        app.package.toLowerCase().includes(q) ||
        app.technologies?.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialApps, activeCategory, searchQuery]);

  return (
    <div id="apps" className="space-y-8 scroll-mt-20">
      {/* Category Controls & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#12131c]/70 border border-red-500/20 backdrop-blur-md shadow-lg">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
            const isGame = cat.toLowerCase() === 'games';
            const count =
              cat === 'All'
                ? initialApps.length
                : initialApps.filter(
                    (a) => (a.category || '').toLowerCase() === cat.toLowerCase()
                  ).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {isGame && <FaGamepad className="h-3.5 w-3.5" />}
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, tech, or packages..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
      </div>

      {/* Dedicated Games Banner (if viewing all or games) */}
      {(activeCategory === 'All' || activeCategory.toLowerCase() === 'games') && (
        <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-rose-950/20 to-transparent p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-md relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-sm">
              <FaGamepad className="h-3.5 w-3.5" />
              <span>Dedicated Games Showcase</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Looking for Full Screen Gameplay & Engine Architecture?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore Chess Binge & Ludo Binge with real-time multiplayer WebSocket matchmaking, AI move depth analysis, and instant QR scans on the dedicated games hub.
            </p>
          </div>

          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 shrink-0 hover:-translate-y-0.5 transition-all"
          >
            <span>Open Games Arena</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Grid of App Cards */}
      {filteredApps.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl border-2 border-dashed border-red-500/20 max-w-md mx-auto space-y-3">
          <div className="text-4xl">🔍</div>
          <h4 className="text-base font-bold text-white">No applications match your filter</h4>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or reset the category filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-red-400 underline hover:no-underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredApps.map((app) => (
            <AppCard key={app._id || app.id || app.package} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
