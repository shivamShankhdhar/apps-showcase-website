import React from 'react';

export default function AppsDirectoryLoading() {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Skeleton */}
        <div className="space-y-4 max-w-3xl">
          <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="h-10 w-80 rounded-xl bg-white/10 animate-pulse" />
          <div className="h-4 w-full max-w-xl rounded-lg bg-white/5 animate-pulse" />
        </div>

        {/* Filter and Search Bar Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 border-y border-white/10">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="h-9 w-28 rounded-xl bg-white/10 animate-pulse" />
            <div className="h-9 w-36 rounded-xl bg-white/10 animate-pulse" />
            <div className="h-9 w-36 rounded-xl bg-white/10 animate-pulse" />
          </div>
          <div className="h-9 w-full sm:w-64 rounded-xl bg-white/10 animate-pulse" />
        </div>

        {/* Cards Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-white/10 bg-[#12131c]/80 p-6 sm:p-7 space-y-6 relative overflow-hidden"
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

              {/* Icon & Title skeleton */}
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white/10 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-3/4 rounded-lg bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/5" />
                  <div className="h-3 w-1/3 rounded bg-white/5" />
                </div>
              </div>

              {/* Tagline skeleton */}
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-white/5" />
                <div className="h-3 w-4/5 rounded bg-white/5" />
              </div>

              {/* Badges skeleton */}
              <div className="flex gap-2">
                <div className="h-6 w-20 rounded-full bg-white/10" />
                <div className="h-6 w-24 rounded-full bg-white/10" />
              </div>

              {/* Buttons skeleton */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="h-9 w-32 rounded-xl bg-white/10" />
                <div className="h-9 w-9 rounded-xl bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
