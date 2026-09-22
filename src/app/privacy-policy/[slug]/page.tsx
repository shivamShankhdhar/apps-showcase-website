import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { FiShield, FiArrowLeft, FiCheckCircle, FiMail } from 'react-icons/fi';
import { defaultApps } from '@/lib/defaultData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = defaultApps.find(
    (a) =>
      a.id?.toLowerCase() === slug.toLowerCase() ||
      a.package?.toLowerCase() === slug.toLowerCase() ||
      a.title?.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  );

  const title = app ? `${app.title} - Privacy Policy` : 'App Privacy Policy';
  return {
    title: `${title} | Shivam Apps Hub`,
    description: `Official Google Play Privacy Policy for ${app?.title || 'Android App'} (${app?.package || ''}).`,
  };
}

export default async function AppPrivacyPolicyPage({ params }: PageProps) {
  const { slug } = await params;
  const app = defaultApps.find(
    (a) =>
      a.id?.toLowerCase() === slug.toLowerCase() ||
      a.package?.toLowerCase() === slug.toLowerCase() ||
      a.title?.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  );

  const isGame = app?.category?.toLowerCase() === 'games' || slug.toLowerCase().includes('chess') || slug.toLowerCase().includes('ludo');

  if (isGame) {
    redirect(`/apps/games/${app?.id || slug}/privacy-policy`);
  }

  const appName = app?.title || slug.replace(/-/g, ' ').toUpperCase();
  const packageName = app?.package || `com.shivam.${slug}`;

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

        {/* Title Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/15 text-red-400 border border-red-500/30">
            <FiShield className="h-3.5 w-3.5" />
            <span>Google Play Policy Disclosure</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {appName} Privacy Policy
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
            <span>Package: <strong className="text-red-400">{packageName}</strong></span>
            <span>•</span>
            <span>Developer: Shivam Shankhdhar</span>
            <span>•</span>
            <span>Effective: September 2026</span>
          </div>
        </div>

        {/* Policy Content */}
        <div className="rounded-3xl border border-red-500/20 bg-[#12131c]/90 p-8 space-y-8 text-sm leading-relaxed text-slate-300 shadow-xl">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>1. Overview & Data Collection</span>
            </h2>
            <p>
              This Privacy Policy applies to the Android mobile application <strong>{appName}</strong> (Package ID: <code className="text-red-400 font-mono">{packageName}</code>).
            </p>
            <p>
              <strong>{appName} does NOT collect, track, or share any personal user data.</strong> There are no account registrations required, no email logins, no contact list requests, and no background location tracking.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>2. Device Permissions & Offline Storage</span>
            </h2>
            <p>
              {appName} runs with minimal Android operating system permissions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>VIBRATE:</strong> Used solely for tactile haptic feedback during in-game actions or timer alerts.</li>
              <li><strong>INTERNET:</strong> {isGame ? 'Used for real-time multiplayer WebSocket connections and AdMob verification.' : 'Used only for network diagnostic tools when explicitly initiated by the user.'}</li>
            </ul>
            <p className="pt-1">
              All settings and game records remain locally sandboxed on your device using encrypted local storage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>3. Advertising & Google AdMob Compliance</span>
            </h2>
            <p>
              When advertisements are shown, they are delivered through Google AdMob SDK in compliance with Google Play Developer Program Policies. Google may use the device Advertising ID to deliver relevant, safe advertisements.
            </p>
            <p>
              Users can manage or reset their personalized advertising ID at any time via Android Device Settings or via{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 underline hover:no-underline"
              >
                Google Ad Settings
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>4. Developer Inquiries & Support</span>
            </h2>
            <p>
              For developer inquiries, bug reports, or policy questions regarding <strong>{appName}</strong>, contact:
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
