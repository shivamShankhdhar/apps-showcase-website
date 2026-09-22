import React from 'react';

export default function GameDetailLoading() {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 rounded bg-white/10 animate-pulse" />

        {/* Hero Product Overview Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-28 rounded bg-white/10 animate-pulse" />
                <div className="h-5 w-20 rounded bg-white/10 animate-pulse" />
              </div>
              <div className="h-10 w-72 rounded-xl bg-white/10 animate-pulse" />
              <div className="h-5 w-96 rounded bg-white/5 animate-pulse" />
              <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
            </div>

            {/* Spec grid skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-3 border-y border-white/10">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-1">
                  <div className="h-2 w-16 rounded bg-white/5 animate-pulse" />
                  <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
                </div>
              ))}
            </div>

            {/* Interactive board preview skeleton */}
            <div className="rounded-2xl bg-[#12131c] border border-white/10 p-5 flex items-center gap-5">
              <div className="w-32 h-32 rounded-xl bg-white/5 animate-pulse shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />
                <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
                <div className="h-5 w-60 rounded bg-white/5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* QR / Platform card skeleton */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-3xl bg-[#12131c] border border-white/10 p-6 space-y-6">
              <div className="h-8 w-40 rounded-xl bg-white/10 animate-pulse" />
              <div className="h-48 w-48 mx-auto rounded-2xl bg-white/5 animate-pulse" />
              <div className="h-10 w-full rounded-xl bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Screenshot Suite Skeleton */}
        <div className="rounded-3xl bg-[#12131c] border border-white/10 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 aspect-[9/19.5] rounded-[36px] bg-white/5 border border-white/10 animate-pulse" />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <div className="h-4 w-32 rounded bg-white/10 animate-pulse" />
            <div className="h-8 w-64 rounded-xl bg-white/10 animate-pulse" />
            <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-white/5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
