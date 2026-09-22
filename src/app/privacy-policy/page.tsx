import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiShield, FiCheckCircle, FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Privacy Policy - Shivam Apps Hub',
  description: 'Official developer privacy policy for mobile applications and games created by Shivam Shankhdhar.',
};

export default function PrivacyPolicyPage() {
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
            <FiShield className="h-3.5 w-3.5" />
            <span>Developer Privacy Commitment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Mobile Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last updated: September 2026 • Applies to all applications published by developer Shivam Shankhdhar
          </p>
        </div>

        <div className="rounded-3xl border border-red-500/20 bg-[#12131c]/90 p-8 space-y-8 text-sm leading-relaxed text-slate-300">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>1. Zero Personal Data Harvesting</span>
            </h2>
            <p>
              We believe privacy is a fundamental human right. Our mobile applications (including Chess Binge, Ludo Binge, FlowTask, and DevLens) are designed with a <strong>local-first architecture</strong>. We do not collect, store, sell, or monetize any personally identifiable information (PII) like your name, email address, physical location, or contact list.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>2. Local Device Storage</span>
            </h2>
            <p>
              Game progression, high scores, board configurations, and user preferences are stored entirely locally on your device via sandboxed SQLite/AsyncStorage databases. Uninstalling the app completely wipes this data from your device.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>3. Google AdMob & Third-Party Services</span>
            </h2>
            <p>
              Some free versions of our applications may display non-intrusive advertisements served through Google AdMob. AdMob may utilize anonymous advertising identifiers (Google Advertising ID) to serve contextual ads in accordance with Google Play Family Policies and GDPR regulations.
            </p>
            <p>
              You can opt out of personalized ads at any time in your Android device settings via <em>Settings &gt; Google &gt; Ads &gt; Delete advertising ID</em> or through Google&apos;s Ad Settings portal at{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 underline hover:no-underline"
              >
                adssettings.google.com
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>4. Children&apos;s Privacy (COPPA Compliance)</span>
            </h2>
            <p>
              Our games and applications are family-friendly and do not knowingly solicit or collect data from children under the age of 13.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>5. Developer Contact</span>
            </h2>
            <p>
              If you have any questions, feedback, or verification inquiries regarding our privacy standards, feel free to contact developer Shivam Shankhdhar directly:
            </p>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 inline-flex items-center gap-2 text-xs font-mono text-slate-300">
              <FiMail className="h-4 w-4 text-red-500" />
              <span>er.shivam1214@gmail.com</span>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}
