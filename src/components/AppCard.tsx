'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiSmartphone,
  FiExternalLink,
  FiShield,
  FiCheckCircle,
  FiLock,
  FiChevronRight,
} from 'react-icons/fi';
import { BsQrCode } from 'react-icons/bs';
import { FaGooglePlay, FaStar, FaGamepad } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { AppItem } from '@/lib/defaultData';
import QRCodeModal from './QRCodeModal';
import AppIcon from './ui/AppIcon';

interface AppCardProps {
  app: AppItem;
}

export default function AppCard({ app }: AppCardProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const isGame = (app.category || '').toLowerCase() === 'games';
  const detailUrl = isGame
    ? `/apps/games/${app.id || app.package}`
    : `/apps/${app.id || app.package}`;

  const isTesting =
    app.status?.toLowerCase().includes('closed') ||
    app.status?.toLowerCase().includes('testing') ||
    app.rating?.toLowerCase().includes('coming');

  const shareUrl =
    app.playStoreUrl ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}${detailUrl}`
      : 'https://shivamshankhdhar.dev');

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-red-500/20 bg-[#12131c]/90 backdrop-blur-xl p-6 sm:p-7 shadow-xl hover:border-red-500/50 transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden"
      >
        {/* Subtle Gradient Backlight on Hover */}
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all pointer-events-none" />

        <div className="space-y-5 relative z-10">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <Link
                href={detailUrl}
                className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-600/20 via-rose-600/20 to-transparent border border-red-500/30 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform"
              >
                <AppIcon title={app.title} category={app.category} iconString={app.icon} className="h-7 w-7" />
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    <Link href={detailUrl} className="hover:text-red-400 transition-colors">
                      {app.title}
                    </Link>
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {app.version || 'v1.0.0'}
                  </span>
                </div>
                {app.subtitle && (
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {app.subtitle}
                  </p>
                )}
                <p className="text-[11px] font-mono text-red-400 mt-0.5">
                  {app.package}
                </p>
              </div>
            </div>

            {/* Badges Column */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                  isGame
                    ? 'bg-red-500/10 text-red-400 border-red-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {isGame ? <FaGamepad className="h-3 w-3" /> : <FiSmartphone className="h-3 w-3" />}
                <span>{app.category}</span>
              </span>

              <span
                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isTesting
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isTesting ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
                  }`}
                />
                <span>{isTesting ? 'Closed Testing' : 'Production'}</span>
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {app.tagline}
          </p>

          {/* Rating & User Count Bar */}
          <div className="flex items-center justify-between text-xs font-semibold py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-1.5 text-amber-400">
              <FaStar className="h-3.5 w-3.5" />
              <span>{app.rating || '4.9'}</span>
              <span className="text-slate-500 font-normal">Rating</span>
            </div>
            <span className="h-3 w-[1px] bg-white/10" />
            <span className="text-slate-400">
              {app.ratingCount || (isTesting ? 'Closed Testing' : '500+ Installs')}
            </span>
          </div>

          {/* Tech Stack Pills */}
          {app.technologies && app.technologies.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Architecture & Modules
              </p>
              <div className="flex flex-wrap gap-1.5">
                {app.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-red-500/5 text-slate-300 border border-red-500/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Highlights */}
          {app.highlights && app.highlights.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Key Features
              </p>
              <ul className="space-y-1 text-xs text-slate-300">
                {app.highlights.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <FiCheckCircle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <Link
              href={detailUrl}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isGame
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              {isGame ? <FaGamepad className="h-3.5 w-3.5" /> : <FiSmartphone className="h-3.5 w-3.5 text-red-400" />}
              <span>{isGame ? 'Explore Game' : 'View App'}</span>
              <FiChevronRight className="h-3 w-3" />
            </Link>

            {isTesting ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 text-slate-400 border border-white/10 cursor-not-allowed">
                <FiLock className="h-3 w-3 text-amber-500" />
                <span>Closed Testing</span>
              </span>
            ) : app.playStoreUrl ? (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-900 hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                <FaGooglePlay className="h-3 w-3 text-emerald-600 group-hover:text-white" />
                <span>Google Play</span>
              </a>
            ) : null}

            {/* QR Code Modal Trigger */}
            <button
              onClick={() => setIsQrOpen(true)}
              title="Scan QR code on Mobile"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
            >
              <BsQrCode className="h-4 w-4 text-red-400" />
            </button>
          </div>

          {/* Privacy Link */}
          {app.privacyUrl && (
            <Link
              href={app.privacyUrl}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-red-400 transition-colors"
            >
              <FiShield className="h-3 w-3 text-red-500" />
              <span>Privacy Policy</span>
            </Link>
          )}
        </div>
      </motion.div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title={app.title}
        url={shareUrl}
        icon={app.icon}
        packageId={app.package}
      />
    </>
  );
}
