import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-transparent relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Animated Cyber Radar / Orb */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer rotating dashed ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/40 animate-[spin_10s_linear_infinite]" />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 rounded-full border border-red-500/30 animate-ping opacity-30" />
          
          {/* Inner counter-rotating ring */}
          <div className="absolute inset-4 rounded-full border-2 border-t-red-500 border-r-transparent border-b-rose-500 border-l-transparent animate-[spin_3s_linear_infinite_reverse]" />

          {/* Core Glowing Core */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.9)] animate-pulse" />
        </div>

        {/* Loading Indicators */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="tracking-widest uppercase">Loading Hub Assets</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Synchronizing client runtime state...
          </p>
        </div>

        {/* Shimmering Progress Bar Indicator */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
