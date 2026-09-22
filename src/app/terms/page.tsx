import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiFileText, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Terms of Service - Shivam Apps Hub',
  description: 'Terms of service for applications and games published by Shivam Shankhdhar.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-developer-grid">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-red-500/20 bg-[#12131c] text-slate-300 hover:text-red-400 transition-all text-xs"
        >
          <FiArrowLeft className="h-3.5 w-3.5 text-red-500" />
          <span>Back to Apps Hub</span>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/15 text-red-400 border border-red-500/30">
            <FiFileText className="h-3.5 w-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Effective: September 2026
          </p>
        </div>

        <div className="rounded-3xl border border-red-500/20 bg-[#12131c]/90 p-8 space-y-6 text-sm leading-relaxed text-slate-300 shadow-xl">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or playing any mobile application published by Shivam Shankhdhar, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. License & Fair Play</h2>
            <p>
              You are granted a personal, non-exclusive, non-transferable revocable license to use our applications for personal entertainment and utility. In multiplayer games (e.g. Ludo Binge, Chess Binge), the use of unauthorized bots, memory modification tools, or reverse engineering is prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Disclaimer of Warranties</h2>
            <p>
              Applications are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Updates & Maintenance</h2>
            <p>
              We periodically release application updates, performance optimizations, and security patches through Google Play Store.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}
