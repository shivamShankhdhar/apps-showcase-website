import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiShield, FiGrid } from 'react-icons/fi';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';
import AppsPageClient from './AppsPageClient';

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
    console.error('Error fetching apps:', err);
  }

  return defaultApps;
}

export const metadata = {
  title: 'Products Directory & Technical Index | Shivam Software Lab',
  description: 'Production Android releases, package signatures, and architectural documentation for Chess Binge and Ludo Binge.',
};

export default async function AppsPage() {
  const apps = await getApps();

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-medium">Products</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-white/5 border border-white/10">
            <FiGrid className="h-3.5 w-3.5 text-slate-400" />
            <span>Release Directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Software Products & Engines
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Production Android software systems engineered with deterministic state recovery, local intelligence bots, and zero-telemetry client sandboxing. Select any product to inspect architectural specifications.
          </p>
        </div>

        {/* Client Search & Card Grid */}
        <AppsPageClient initialApps={apps} />

        {/* Engineering Commitment */}
        <div className="rounded-2xl bg-[#12131c] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 max-w-4xl">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 shrink-0">
            <FiShield className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">
              Compliance & Binary Verification
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every production package listed in this directory is compiled directly from audited TypeScript and native codebases, signed with cryptographic Android Keystore signatures, and verified against Google Play Store closed track requirements.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
