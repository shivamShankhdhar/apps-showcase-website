import React from 'react';
import Link from 'next/link';
import {
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink,
  FiShield,
  FiCpu,
  FiZap,
  FiDatabase,
  FiClock,
  FiCode,
  FiActivity,
  FiLayers,
  FiTerminal,
  FiSliders,
  FiLock,
  FiSmartphone,
} from 'react-icons/fi';
import { FaGooglePlay, FaChessKnight, FaDiceD6, FaAndroid, FaApple } from 'react-icons/fa6';
import Phone3DShowcase from '@/components/3d/Phone3DShowcase';
import ParticleMatrix from '@/components/3d/ParticleMatrix';
import Image from 'next/image';
import ArchitectureSection from '@/components/ArchitectureSection';
import FeaturedDeployments from '@/components/FeaturedDeployments';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';

import Profile from '@/models/Profile';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    console.error('Error fetching apps in HomePage:', err);
  }

  return defaultApps;
}

async function getProfileSettings(): Promise<{ portfolioUrl: string }> {
  try {
    if (isDbConfigured()) {
      const conn = await connectDB();
      if (conn) {
        const profile = await Profile.findOne();
        if (profile?.portfolioUrl) {
          return { portfolioUrl: profile.portfolioUrl };
        }
      }
    }
  } catch (err) {
    console.error('Error fetching profile in HomePage:', err);
  }

  return { portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://shivamshankhdhar.dev' };
}

export default async function HomePage() {
  const [apps, profileSettings] = await Promise.all([getApps(), getProfileSettings()]);
  const portfolioUrl = profileSettings.portfolioUrl;

  return (
    <main className="relative bg-[#09090b] text-slate-100 overflow-hidden">
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 pb-16 bg-developer-grid bg-radial-gradient">
        <ParticleMatrix />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Hero Overview */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Systems & Game Engines</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Engineered for Resilience. <br className="hidden sm:inline" />
                <span className="text-slate-400 font-semibold">Built for Offline Play.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Production mobile software systems designed with compiled native logic, zero-cloud telemetry dependencies, and verified local state recovery across Android & iOS.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-red-600 hover:bg-red-500 text-white shadow-sm transition-all"
              >
                <span>Browse Apps Directory</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#architecture"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                <FiCpu className="h-4 w-4 text-slate-400" />
                <span>Architecture & Standards</span>
              </a>

              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <span>Developer Profile</span>
                <FiExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Engineering Metrics Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0 border-t border-white/10">
              <div>
                <p className="text-lg font-bold text-white font-mono">100%</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Offline Independent</p>
              </div>
              <div>
                <p className="text-lg font-bold text-emerald-400 font-mono">0 KB</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Telemetry Leaks</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white font-mono">60/120 Hz</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Render Engine</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-300 font-mono">Multi-OS</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Android & iOS</p>
              </div>
            </div>
          </div>

          {/* Right Interactive Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <Phone3DShowcase />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT HIGHLIGHTS (DYNAMICALLY CONTROLLED VIA ADMIN) */}
      {/* ========================================================================= */}
      <FeaturedDeployments apps={apps} />

      {/* ========================================================================= */}
      {/* REAL-TIME ENGINE BENCHMARKS & DIAGNOSTICS CONSOLE (NEW SECTION) */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="rounded-3xl bg-gradient-to-b from-[#12131c] via-[#0d0e15] to-[#09090b] border border-white/10 p-8 sm:p-10 space-y-8 relative overflow-hidden shadow-2xl">
          {/* Subtle Cyber Grid Background */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400 uppercase tracking-wider">Automated QA & Execution Telemetry</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Runtime Diagnostics & Engine Benchmarks
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                Continuous performance auditing measured across real hardware devices from low-spec ARMv7 targets to flagship Snapdragon & Tensor silicon.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-slate-300 self-start md:self-auto">
              <FiTerminal className="h-3.5 w-3.5 text-emerald-400" />
              <span>PROD_KERNEL_OK</span>
            </div>
          </div>

          {/* Benchmark Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-emerald-500/40 transition-colors">
              <p className="text-[10px] font-mono uppercase text-slate-400">Frame Pacing</p>
              <p className="text-xl font-black text-emerald-400 font-mono">16.6 ms</p>
              <p className="text-[10px] text-slate-400">99.8% 60 FPS Target</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-sky-500/40 transition-colors">
              <p className="text-[10px] font-mono uppercase text-slate-400">Heap Memory</p>
              <p className="text-xl font-black text-sky-400 font-mono">&lt; 38 MB</p>
              <p className="text-[10px] text-slate-400">Zero GC Pressure</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-violet-500/40 transition-colors">
              <p className="text-[10px] font-mono uppercase text-slate-400">Cold Launch</p>
              <p className="text-xl font-black text-violet-400 font-mono">310 ms</p>
              <p className="text-[10px] text-slate-400">Instant Interactive</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-amber-500/40 transition-colors">
              <p className="text-[10px] font-mono uppercase text-slate-400">Battery Overhead</p>
              <p className="text-xl font-black text-amber-400 font-mono">1.4% / hr</p>
              <p className="text-[10px] text-slate-400">Surface Suspend Loop</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-emerald-500/40 transition-colors">
              <p className="text-[10px] font-mono uppercase text-slate-400">Telemetry Leaks</p>
              <p className="text-xl font-black text-emerald-400 font-mono">0 Bytes</p>
              <p className="text-[10px] text-slate-400">Pure Local Sandbox</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-rose-500/40 transition-colors">
              <p className="text-[10px] font-mono uppercase text-slate-400">Release Size</p>
              <p className="text-xl font-black text-rose-400 font-mono">&lt; 18 MB</p>
              <p className="text-[10px] text-slate-400">ProGuard R8 Stripped</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ARCHITECTURE & STANDARDS SECTION (REDESIGNED WITH ANIMATIONS & CARDS) */}
      {/* ========================================================================= */}
      <ArchitectureSection />

      {/* ========================================================================= */}
      {/* CORE SUBSYSTEMS & VERIFICATION STANDARDS (DUAL-ECOSYSTEM: ANDROID & IOS) */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Subsystems Header */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Execution Guarantees</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Verified Android & iOS Ecosystem Compatibility
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every build artifact undergoes multi-device regression suites verifying cold-starts, responsive layout reflows across foldables, tablets, iPads & iPhones, and zero-leak memory integrity under low-RAM pressure. Native core engines are compiled identically for Android NDK and Apple iOS ARM64 runtimes.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <FaAndroid className="h-3.5 w-3.5 text-emerald-400" />
                <span>Android API 26 – 35+</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <FaApple className="h-3.5 w-3.5 text-slate-200" />
                <span>iOS 15.0+ & iPadOS</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span>Play Protect & App Store Ready</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <FiCpu className="h-3.5 w-3.5 text-sky-400" />
                <span>Apple Silicon & 64-Bit ARMv8</span>
              </span>
            </div>
          </div>

          {/* Right Subsystems Details Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#12131c] border border-white/10 space-y-2 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FaChessKnight className="h-4 w-4 text-rose-400" />
                <span>Stockfish & Minimax Cross-Compiled</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Native C++ move generation compiled for both Android NDK (ARMv8/x86_64) and Apple iOS Clang LLVM. Evaluates legal board states in sub-millisecond threads with zero runtime divergence.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#12131c] border border-white/10 space-y-2 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FaDiceD6 className="h-4 w-4 text-amber-400" />
                <span>Deterministic Cross-OS PRNG</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cryptographically seeded pseudo-random distribution guaranteeing identical, tamper-proof dice distributions and fair turn sequencing across both Android devices and iPhones.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#12131c] border border-white/10 space-y-2 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FiZap className="h-4 w-4 text-emerald-400" />
                <span>Skia & Metal GPU Surface</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hardware-accelerated rendering utilizing Vulkan/Skia on Android and Apple Metal on iOS. Delivers butter-smooth 60Hz and 120Hz ProMotion piece animations and responsive haptics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#12131c] border border-white/10 space-y-2 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FiLock className="h-4 w-4 text-sky-400" />
                <span>Sandboxed Local Data & Keychain</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                User coins, unlocked cosmetic themes, and match archives are secured in encrypted on-device keychains (Android MMKV / Keystore and iOS Secure Enclave) with zero cloud telemetry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Engineering Philosophy Quote */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-red-950/30 via-slate-900/60 to-black/80 border border-red-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-2 right-6 font-serif text-[100px] sm:text-[140px] font-black text-red-500/10 pointer-events-none select-none leading-none">
            &ldquo;
          </div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/20">
              <span>✦ MOBILE ENGINEERING PHILOSOPHY</span>
            </div>
            <blockquote className="text-lg sm:text-2xl font-bold text-white leading-relaxed tracking-tight">
              &ldquo;Great mobile software runs seamlessly in the palm of your hand: offline-first, battery-efficient, and engineered without compromise.&rdquo;
            </blockquote>
            <p className="text-xs font-mono text-slate-400">
              — Shivam Shankhdhar • Native App Architect &amp; Game Engine Creator
            </p>
          </div>
        </div>
      </section>

      {/* Directory CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="rounded-3xl bg-gradient-to-r from-[#141522] via-[#12131c] to-[#0d0e15] border border-white/10 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-1 text-center sm:text-left relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Explore the Software Directory
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Access release documentation, build targets, package manifests, and interactive demonstrations.
            </p>
          </div>

          <Link
            href="/apps"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 hover:scale-105 transition-all shrink-0 relative z-10"
          >
            <span>Open Apps Directory</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
