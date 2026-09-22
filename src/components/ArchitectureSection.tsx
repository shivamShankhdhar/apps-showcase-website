'use client';

import React from 'react';
import { FiDatabase, FiClock, FiShield, FiCode } from 'react-icons/fi';
import ArchitectureCard from './ArchitectureCard';

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-t border-white/10">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-white/5 border border-white/10">
          <FiShield className="h-3.5 w-3.5 text-red-400" />
          <span>Compliance & Runtime Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          High-Performance Android Engineering
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Eliminating network bloat, telemetry dependencies, and cloud failure points through deterministic client execution, synchronous memory serialization, and hardware-accelerated canvas surfaces.
        </p>
      </div>

      {/* Dynamic Animated Architecture Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ArchitectureCard
          index={0}
          icon={FiDatabase}
          title="Local-First Storage"
          badge="0 ms I/O Block"
          description="Game state serializes synchronously to MMKV binary storage. Sudden OS process termination, incoming calls, or multitasking will never corrupt or forfeit match progress."
          techTag="MMKV & SQLite v3 Engine"
          metricLabel="Persistence Latency"
          metricValue="< 0.8 ms"
          accent="emerald"
        />

        <ArchitectureCard
          index={1}
          icon={FiClock}
          title="Controlled Power Budget"
          badge="60 FPS Delta-Time"
          description="Hardware-accelerated Skia render updates operate exclusively when the game surface is foregrounded. Physics timers immediately suspend when minimized to conserve battery."
          techTag="Fixed-Step Physics Loop"
          metricLabel="Idle CPU Impact"
          metricValue="0.0% Drain"
          accent="sky"
        />

        <ArchitectureCard
          index={2}
          icon={FiShield}
          title="Zero Identity Harvester"
          badge="GDPR / UMP Compliant"
          description="Games require zero mandatory sign-ups, phone numbers, or background contact scraping. Advertising complies strictly with Google UMP consent standards without device fingerprinting."
          techTag="Device Sandbox Envelope"
          metricLabel="Network Outbound"
          metricValue="0 KB / s"
          accent="violet"
        />

        <ArchitectureCard
          index={3}
          icon={FiCode}
          title="Signed AAB Binaries"
          badge="Keystore v2 Signed"
          description="Every production release is compiled as an optimized Android App Bundle (AAB) using ProGuard bytecode shrinking, dead code elimination, and strict RSA-4096 signing keys."
          techTag="R8 Bytecode Optimizer"
          metricLabel="Binary Footprint"
          metricValue="-42% Trimmed"
          accent="rose"
        />
      </div>
    </section>
  );
}
