'use client';

import React, { useState } from 'react';
import { FiSearch, FiLayers, FiCpu } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa6';
import { AppItem } from '@/lib/defaultData';
import AppCard from '@/components/AppCard';

interface AppsPageClientProps {
  initialApps: AppItem[];
}

export default function AppsPageClient({ initialApps }: AppsPageClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'games' | 'apps'>('all');

  const categories = [
    { id: 'all' as const, label: 'All Software', count: initialApps.length },
    {
      id: 'games' as const,
      label: 'Board & Strategy Games',
      count: initialApps.filter((a) => (a.category || '').toLowerCase() === 'games').length,
    },
    {
      id: 'apps' as const,
      label: 'Applications & Utilities',
      count: initialApps.filter((a) => (a.category || '').toLowerCase() !== 'games').length,
    },
  ];

  const filteredApps = initialApps.filter((app) => {
    const isGame = (app.category || '').toLowerCase() === 'games';
    if (selectedCategory === 'games' && !isGame) return false;
    if (selectedCategory === 'apps' && isGame) return false;

    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      app.title.toLowerCase().includes(term) ||
      (app.subtitle && app.subtitle.toLowerCase().includes(term)) ||
      (app.tagline && app.tagline.toLowerCase().includes(term)) ||
      app.package.toLowerCase().includes(term)
    );
  });

  const gamesList = filteredApps.filter((a) => (a.category || '').toLowerCase() === 'games');
  const otherAppsList = filteredApps.filter((a) => (a.category || '').toLowerCase() !== 'games');

  return (
    <div className="space-y-10">
      {/* Controls: Search & Category Filter Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'bg-[#12131c] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1.5 text-[10px] opacity-70 font-mono">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 h-3.5 w-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by package or keyword..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#12131c] border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
      </div>

      {/* Categorized Displays */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#12131c] border border-white/10 space-y-3 max-w-md mx-auto">
          <FiLayers className="h-6 w-6 text-slate-500 mx-auto" />
          <p className="text-slate-300 font-medium text-xs">
            No software releases found matching &quot;{search}&quot;
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="text-xs text-red-400 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Category: Games */}
          {(selectedCategory === 'all' || selectedCategory === 'games') && gamesList.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <FaGamepad className="h-4 w-4 text-slate-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Board & Strategy Games ({gamesList.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gamesList.map((app) => (
                  <AppCard key={app.id || app.package} app={app} />
                ))}
              </div>
            </div>
          )}

          {/* Category: Other Applications */}
          {(selectedCategory === 'all' || selectedCategory === 'apps') && otherAppsList.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <FiCpu className="h-4 w-4 text-slate-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  System Utilities & Applications ({otherAppsList.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherAppsList.map((app) => (
                  <AppCard key={app.id || app.package} app={app} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
