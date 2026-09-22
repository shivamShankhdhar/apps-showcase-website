'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiSmartphone,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiCopy,
  FiCheck,
  FiLock,
  FiLayers,
} from 'react-icons/fi';
import { BsQrCode } from 'react-icons/bs';
import { FaGooglePlay, FaStar } from 'react-icons/fa6';
import { AppItem } from '@/lib/defaultData';
import QRCodeModal from '@/components/QRCodeModal';
import AppIcon from '@/components/ui/AppIcon';

interface AppDetailClientProps {
  app: AppItem;
}

export default function AppDetailClient({ app }: AppDetailClientProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isTesting =
    app.status?.toLowerCase().includes('closed') ||
    app.status?.toLowerCase().includes('testing') ||
    app.rating?.toLowerCase().includes('coming');

  const shareUrl =
    app.playStoreUrl ||
    (typeof window !== 'undefined' ? window.location.href : 'https://apps.shivamshankhdhar.dev');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-red-500/20 bg-[#12131c] text-slate-300 hover:text-red-400 transition-all shadow-xs"
          >
            <FiArrowLeft className="h-3.5 w-3.5 text-red-500" />
            <span>Back to Applications</span>
          </Link>

          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/apps" className="hover:text-red-400 transition-colors">
              Apps
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">{app.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="rounded-3xl border border-red-500/25 bg-[#12131c]/90 p-8 sm:p-10 space-y-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-red-600/20 to-rose-600/20 border border-red-500/40 flex items-center justify-center shadow-lg shrink-0">
                <AppIcon title={app.title} category={app.category} iconString={app.icon} className="h-10 w-10" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                    {app.title}
                  </h1>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {app.version || 'v1.0.0'}
                  </span>
                </div>
                {app.subtitle && (
                  <p className="text-base font-semibold text-red-400 mt-1">
                    {app.subtitle}
                  </p>
                )}
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Package: <span className="text-white">{app.package}</span> • {app.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                  isTesting
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isTesting ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
                  }`}
                />
                <span>{isTesting ? 'Closed Testing' : 'Google Play Production'}</span>
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {app.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {isTesting ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold bg-white/5 text-slate-400 border border-white/10">
                <FiLock className="h-4 w-4 text-amber-400" />
                <span>Closed Testing / Internal Alpha</span>
              </div>
            ) : app.playStoreUrl ? (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all"
              >
                <FaGooglePlay className="h-4 w-4" />
                <span>Get on Google Play</span>
              </a>
            ) : null}

            <button
              onClick={() => setIsQrOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all"
            >
              <BsQrCode className="h-4 w-4 text-red-400" />
              <span>Scan QR Code</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
              title="Copy App Link"
            >
              {copied ? <FiCheck className="h-4 w-4 text-emerald-400" /> : <FiCopy className="h-4 w-4" />}
            </button>

            {app.privacyUrl && (
              <Link
                href={app.privacyUrl}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
              >
                <FiShield className="h-4 w-4 text-red-500" />
                <span>Privacy Policy</span>
              </Link>
            )}
          </div>
        </div>

        {/* Highlights & Features Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Highlights */}
          {app.highlights && app.highlights.length > 0 && (
            <div className="p-7 rounded-3xl bg-[#12131c]/80 border border-red-500/20 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiCheckCircle className="h-5 w-5 text-red-500" />
                <span>Key Features & Architecture</span>
              </h3>
              <ul className="space-y-3">
                {app.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specifications */}
          {app.features && app.features.length > 0 && (
            <div className="p-7 rounded-3xl bg-[#12131c]/80 border border-red-500/20 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiLayers className="h-5 w-5 text-red-500" />
                <span>Technical Specifications</span>
              </h3>
              <div className="divide-y divide-white/5 text-sm">
                {app.features.map((feat, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="text-slate-400">{feat.label}</span>
                    <span className="font-semibold text-white font-mono">{feat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technologies Architecture */}
        {app.technologies && app.technologies.length > 0 && (
          <div className="p-7 rounded-3xl bg-[#12131c]/80 border border-red-500/20 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {app.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-red-500/10 text-red-300 border border-red-500/25"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title={app.title}
        url={shareUrl}
        icon={app.icon}
        packageId={app.package}
      />
    </main>
  );
}
