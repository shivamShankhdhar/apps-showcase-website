'use client';

import React, { useState } from 'react';
import { FiSearch, FiSmartphone } from 'react-icons/fi';
import { AppItem } from '@/lib/defaultData';
import AppCard from '@/components/AppCard';

interface AppsPageClientProps {
  initialApps: AppItem[];
}

export default function AppsPageClient({ initialApps }: AppsPageClientProps) {
  const [search, setSearch] = useState('');

  const filteredApps = initialApps.filter((app) => {
    const term = search.toLowerCase();
    return (
      app.title.toLowerCase().includes(term) ||
      (app.subtitle && app.subtitle.toLowerCase().includes(term)) ||
      (app.tagline && app.tagline.toLowerCase().includes(term)) ||
      app.package.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="max-w-md mx-auto relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, package, or features..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#12131c] border border-red-500/20 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors shadow-inner"
        />
      </div>

      {/* App Cards Grid */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#12131c]/60 border border-dashed border-white/10 space-y-3">
          <FiSmartphone className="h-8 w-8 text-slate-500 mx-auto" />
          <p className="text-slate-300 font-semibold text-sm">No applications found matching &quot;{search}&quot;</p>
          <button
            onClick={() => setSearch('')}
            className="text-xs text-red-400 hover:underline font-semibold"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredApps.map((app) => (
            <AppCard key={app.id || app.package} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
