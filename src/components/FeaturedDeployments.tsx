'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiExternalLink, FiClock, FiCheck, FiShield } from 'react-icons/fi';
import { FaGooglePlay, FaApple, FaStar } from 'react-icons/fa6';
import { AppItem } from '@/lib/defaultData';
import { resolveMediaUrl } from '@/lib/driveStorage';

interface FeaturedDeploymentsProps {
  apps: AppItem[];
}

export default function FeaturedDeployments({ apps }: FeaturedDeploymentsProps) {
  // Only display apps marked as featured (or all if none explicitly marked)
  const featuredApps = apps.filter((a) => a.featured !== false);
  const displayApps = featuredApps.length > 0 ? featuredApps : apps;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Section Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Software Portfolio</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Software Deployments
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time catalog synchronized directly from administrative deployment database.
          </p>
        </div>
        <Link
          href="/apps"
          className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View Full Directory ({apps.length} Releases)</span>
          <FiArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Dynamic List of Deployments */}
      <div className="space-y-24">
        {displayApps.map((app, index) => {
          const isEven = index % 2 === 1;
          const isChess =
            app.title.toLowerCase().includes('chess') ||
            app.package.toLowerCase().includes('chess');
          const isLudo =
            app.title.toLowerCase().includes('ludo') ||
            app.package.toLowerCase().includes('ludo');

          const slug = app.id || app.package.split('.').pop() || app.package;
          const detailUrl =
            app.category?.toLowerCase() === 'games'
              ? `/apps/games/${slug}`
              : `/apps/${slug}`;

          const screenshotSrc = resolveMediaUrl(
            isChess
              ? '/screenshots/chess/01_home_dashboard.png'
              : isLudo
              ? '/screenshots/ludo/01_ludo_home.jpg'
              : '/screenshots/chess/01_home_dashboard.png'
          );

          const hasAndroidLink = Boolean(
            app.playStoreUrl && app.playStoreUrl.trim().startsWith('http')
          );
          const hasIosLink = Boolean(
            app.appStoreUrl && app.appStoreUrl.trim().startsWith('http')
          );

          const isTesting =
            app.status?.toLowerCase().includes('testing') ||
            app.status?.toLowerCase().includes('closed') ||
            app.rating?.toLowerCase().includes('coming');

          // Atmosphere Glow & Floating Badges
          const auraClass = isChess
            ? 'from-blue-600/20 via-indigo-600/20 to-rose-600/15'
            : isLudo
            ? 'from-emerald-600/20 via-amber-500/15 to-rose-600/15'
            : 'from-purple-600/20 via-rose-600/15 to-cyan-500/15';

          const badge1Text = isChess
            ? 'Stockfish ELO 2000+'
            : isLudo
            ? '60 FPS Render Loop'
            : 'Zero Telemetry Leaks';

          const badge2Text = isChess
            ? '100% Offline State'
            : isLudo
            ? 'PRNG Seed Engine'
            : 'Deterministic State';

          return (
            <div
              key={app._id || app.package || index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                index > 0 ? 'pt-16 border-t border-white/10' : ''
              }`}
            >
              {/* Summary Column */}
              <div
                className={`lg:col-span-7 space-y-6 ${
                  isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span
                      className={`px-2.5 py-0.5 rounded border font-semibold ${
                        isTesting
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {app.package}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300">
                      {app.status || 'Active'} ({app.version || 'v1.0.0'})
                    </span>
                    {app.containsAds && (
                      <>
                        <span className="text-slate-500">•</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10">
                          Contains ads
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {app.title}
                  </h3>

                  {app.subtitle && (
                    <p className="text-base text-slate-300 font-medium">{app.subtitle}</p>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {app.tagline}
                </p>

                {/* Structured Specifications Grid (Dynamic Features from Admin) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {(app.features && app.features.length > 0
                    ? app.features.slice(0, 4)
                    : isChess
                    ? [
                        { label: 'Engine Intelligence', value: '4 Tiers (Beginner to Master)' },
                        { label: 'Multiplayer Operation', value: 'Pass & Play (2P Offline)' },
                        { label: 'Interactive Academy', value: 'Tactics, Openings & Endgames' },
                        { label: 'Cosmetic Economy', value: '6 Themes & 10 Avatars' },
                      ]
                    : [
                        { label: 'Turn State Model', value: 'ludo-binge-offline-v2' },
                        { label: 'Session Configurations', value: 'Solo AI & 2–4 Player Pass & Play' },
                        { label: 'Cosmetic Inventory', value: '8 Boards • 7 Pawns • 10 Dice' },
                        { label: 'Economy & Streaks', value: 'Daily Fortune Wheel' },
                      ]
                  ).map((spec, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#12131c] border border-white/10 space-y-1"
                    >
                      <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                        {spec.label}
                      </p>
                      <p className="text-xs font-bold text-white">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Google Play Protect & Store Telemetry Row */}
                <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <FiShield className="h-4 w-4" />
                    <span>{app.playProtectVerified !== false ? 'Google Play Protect Verified' : 'Google Play Verified'}</span>
                  </div>
                  <span className="text-white/20">•</span>
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <FaStar className="h-3 w-3" />
                    <span>{app.rating || '4.9'}</span>
                  </div>
                  <span className="text-white/20">•</span>
                  <span className="text-slate-300 font-mono">
                    {app.downloadsTier || (isTesting ? 'Closed Beta Track' : '10K+ Installs')}
                  </span>
                  {app.contentRating && (
                    <>
                      <span className="text-white/20">•</span>
                      <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                        {app.contentRating}
                      </span>
                    </>
                  )}
                </div>

                {/* Action Buttons: Dynamic Store Links or Coming Soon States */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={detailUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-slate-200 transition-colors"
                  >
                    <span>View Complete App Overview</span>
                    <FiArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Android Link / Coming Soon */}
                  {hasAndroidLink ? (
                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    >
                      <FaGooglePlay className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Google Play</span>
                    </a>
                  ) : app.playConsoleUrl ? (
                    <a
                      href={app.playConsoleUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-all"
                    >
                      <FaGooglePlay className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Join Closed Testing</span>
                      <FiExternalLink className="h-3 w-3 opacity-70" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30">
                      <FaGooglePlay className="h-3 w-3 text-amber-400" />
                      <span>Android: {app.playStoreStatus || 'Coming Soon'}</span>
                    </div>
                  )}

                  {/* iOS Link / Coming Soon */}
                  {hasIosLink ? (
                    <a
                      href={app.appStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    >
                      <FaApple className="h-3.5 w-3.5 text-slate-200" />
                      <span>App Store</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/5 border border-white/10">
                      <FaApple className="h-3 w-3 text-slate-400" />
                      <span>iOS: {app.appStoreStatus || 'Coming Soon'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Screenshot Frame Column */}
              <div
                className={`lg:col-span-5 flex justify-center relative ${
                  isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                }`}
              >
                {/* Dynamic Ambient Aura */}
                <div
                  className={`absolute -inset-4 bg-gradient-to-tr ${auraClass} rounded-[50px] blur-3xl opacity-75 pointer-events-none`}
                />

                {/* Floating Tech Badges */}
                <div
                  className={`absolute -top-3 z-30 px-3 py-1.5 rounded-xl bg-[#12131c]/90 border border-white/15 backdrop-blur-md text-[10px] font-mono text-slate-300 flex items-center gap-1.5 shadow-xl animate-float ${
                    isEven ? '-left-2 sm:-left-4' : '-right-2 sm:-right-4'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{badge1Text}</span>
                </div>

                <div
                  className={`absolute -bottom-2 z-30 px-3 py-1.5 rounded-xl bg-[#12131c]/90 border border-white/15 backdrop-blur-md text-[10px] font-mono text-slate-300 flex items-center gap-1.5 shadow-xl animate-float ${
                    isEven ? '-right-2 sm:-right-4' : '-left-2 sm:-left-4'
                  }`}
                  style={{ animationDelay: '1.5s' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>{badge2Text}</span>
                </div>

                {/* Smartphone Device Mockup */}
                <div className="relative w-full max-w-[270px] sm:max-w-[290px] rounded-[38px] p-2.5 bg-gradient-to-b from-slate-800/80 via-[#12131c] to-black border border-white/20 shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
                  {/* Dynamic Island / Punch Hole */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/10" />
                  </div>

                  <div className="relative rounded-[28px] overflow-hidden aspect-[9/19.5] bg-black">
                    <Image
                      src={screenshotSrc}
                      alt={`${app.title} In-App Production Capture`}
                      fill
                      className="object-contain"
                      sizes="320px"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
