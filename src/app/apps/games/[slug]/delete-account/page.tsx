import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FiArrowLeft,
  FiTrash2,
  FiShield,
  FiMail,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiDatabase,
  FiSmartphone,
  FiExternalLink,
} from 'react-icons/fi';
import { defaultApps } from '@/lib/defaultData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = defaultApps.find(
    (a) =>
      a.id?.toLowerCase() === slug.toLowerCase() ||
      a.package?.toLowerCase() === slug.toLowerCase() ||
      a.title?.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  );

  const title = game ? `Delete Account & Data - ${game.title}` : 'Account Deletion Request';
  const description = `Official Account and Data Deletion Request page for ${game?.title || 'Mobile Game'} (${game?.package || 'arrow.binge'}) by Shivam Shankhdhar. Learn how to delete your account, cloud data, and game saves.`;

  return {
    title: `${title} | Shivam Apps Hub`,
    description,
    keywords: [
      game?.title || 'Game',
      'Delete Account',
      'Data Deletion Request',
      'Google Play Data Safety',
      'Shivam Shankhdhar',
    ],
  };
}

export default async function GameDeleteAccountPage({ params }: PageProps) {
  const { slug } = await params;

  const game = defaultApps.find(
    (a) =>
      a.id?.toLowerCase() === slug.toLowerCase() ||
      a.package?.toLowerCase() === slug.toLowerCase() ||
      a.title?.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  );

  const isChess = slug.toLowerCase().includes('chess');
  const isLudo = slug.toLowerCase().includes('ludo');
  const isArrow = slug.toLowerCase().includes('arrow');
  const isBlast = slug.toLowerCase().includes('blast') || slug.toLowerCase().includes('candy') || game?.id === 'blast-binge';
  const isHelix = slug.toLowerCase().includes('helix') || game?.id === 'helix-binge';

  if (!game && !isChess && !isLudo && !isArrow && !isHelix && !isBlast) {
    notFound();
  }

  const appTitle = game?.title || (isBlast ? 'Blast Binge' : (isChess ? 'Chess Binge' : (isLudo ? 'Ludo Binge' : (isArrow ? 'Arrow Binge' : 'Helix Binge'))));
  const appPackage = game?.package || (isBlast ? 'blast.binge' : (isChess ? 'chess.binge' : (isLudo ? 'ludo.binge' : (isArrow ? 'arrow.binge' : 'helix.binge'))));
  const developerName = 'Shivam Shankhdhar';
  const contactEmail = 's.shankhdhar1981@gmail.com';
  const productOverviewUrl = `/apps/games/${game?.id || slug}`;
  const privacyPolicyUrl = `/apps/games/${game?.id || slug}/privacy-policy`;

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-200 font-sans py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/apps" className="hover:text-white transition-colors">
              Apps
            </Link>
            <span className="text-slate-600">/</span>
            <Link href={productOverviewUrl} className="hover:text-white transition-colors">
              {appTitle}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-red-400 font-semibold">Delete Account</span>
          </nav>

          <Link
            href={privacyPolicyUrl}
            className="text-slate-400 hover:text-red-400 transition-colors inline-flex items-center gap-1 font-mono"
          >
            <FiShield className="h-3 w-3" />
            <span>Privacy Policy</span>
          </Link>
        </div>

        {/* Header Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/15 text-red-400 border border-red-500/30">
            <FiTrash2 className="h-3.5 w-3.5" />
            <span>Google Play Account &amp; Data Deletion</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Account &amp; Data Deletion Request
          </h1>
          <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
            Manage your account data and privacy rights for <strong>{appTitle}</strong>. In accordance with Google Play&apos;s User Data policy, users can request the complete deletion of their account, cloud backups, and all associated personal data.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-2">
            <span>Application: <strong className="text-white">{appTitle}</strong></span>
            <span>•</span>
            <span>Package: <strong className="text-red-400">{appPackage}</strong></span>
            <span>•</span>
            <span>Developer: <strong className="text-white">{developerName}</strong></span>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="rounded-3xl border border-red-500/20 bg-[#12131c]/90 p-6 sm:p-10 space-y-10 text-sm sm:text-base leading-relaxed text-slate-300 shadow-2xl">
          
          {/* Quick Notice Card */}
          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 text-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-400 text-base">
              <FiCheckCircle className="h-5 w-5 shrink-0" />
              <span>Full Control Over Your Data</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              {appTitle} does not require account creation to play. Players can enjoy all levels as a guest with 100% offline local storage. If you optionally signed in with Google OAuth to backup your puzzle progress, you can delete your cloud account data at any time through the methods described below.
            </p>
          </div>

          {/* Section 1: How to Request Deletion */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span>1. How to Request Account &amp; Data Deletion</span>
            </h2>
            <p>
              You can request the deletion of your account and associated game data using either of the following two methods:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Method A: In-App Self-Service */}
              <div className="p-5 rounded-2xl border border-white/10 bg-[#151624] space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <FiSmartphone className="h-5 w-5 text-red-400" />
                  <span>Method A: Inside the App (Instant)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Delete your cloud backup and unlink your account directly within {appTitle}:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-300">
                  <li>Open <strong>{appTitle}</strong> on your Android device.</li>
                  <li>Tap the <strong>Settings</strong> icon (or Account Avatar) in the top bar.</li>
                  <li>Navigate to <strong>Account &amp; Cloud Save</strong>.</li>
                  <li>Tap <strong>Delete Cloud Save &amp; Disconnect</strong>.</li>
                  <li>Confirm deletion. Your cloud backup is immediately purged from the server.</li>
                </ol>
              </div>

              {/* Method B: Email Request */}
              <div className="p-5 rounded-2xl border border-white/10 bg-[#151624] space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <FiMail className="h-5 w-5 text-red-400" />
                  <span>Method B: Email Request</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Send a deletion request from the Google email address linked to your account:
                </p>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-300 space-y-1">
                  <div><strong>To:</strong> <a href={`mailto:${contactEmail}`} className="text-red-400 underline">{contactEmail}</a></div>
                  <div><strong>Subject:</strong> {appTitle} - Account Deletion Request</div>
                  <div><strong>Body:</strong> Please delete my account and all associated cloud save data for {appTitle} ({appPackage}).</div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Requests sent via email are processed within <strong>7 business days</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Types of Data Deleted vs Kept */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span>2. Types of Data Deleted and Data Kept</span>
            </h2>

            <div className="overflow-x-auto border border-white/10 rounded-2xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#151624] border-b border-white/10 text-white">
                    <th className="py-3 px-4 font-bold">Category</th>
                    <th className="py-3 px-4 font-bold">Data Types</th>
                    <th className="py-3 px-4 font-bold">Action Taken</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Account Identification</td>
                    <td className="py-3.5 px-4">Google Account ID (OAuth Sub), linked email address, display name, and avatar URL.</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30">
                        Permanently Deleted
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Game Progression</td>
                    <td className="py-3.5 px-4">Completed level indices, puzzle stars, hints balance, hearts, and unlocked artworks.</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30">
                        Permanently Deleted
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Cloud Backups</td>
                    <td className="py-3.5 px-4">Encrypted snapshot blobs saved on Google Cloud Storage / cloud database.</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30">
                        Permanently Purged
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Local Device Data</td>
                    <td className="py-3.5 px-4">Offline preferences and game board state saved in your Android device storage.</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        Deleted via Clear Storage
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Aggregated Telemetry (Anonymized)</td>
                    <td className="py-3.5 px-4">Non-identifiable crash summaries and AdMob fraud-prevention telemetry retained by Google LLC.</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-400">
                        Retained up to 30 days
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Partial Deletion (Clear Progress Without Deleting Account) */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span>3. Partial Deletion (Keep Account, Reset Progress)</span>
            </h2>
            <p>
              Do you want to reset your puzzle progression or delete local device data without deleting your Google Account? You have full granular control:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <strong>Reset Level Progress in App:</strong> Go to <code>Settings &gt; Reset Puzzle Progress</code> inside {appTitle} to start fresh from Level 1 while keeping your Google Sign-In active.
              </li>
              <li>
                <strong>Clear Local Storage on Device:</strong> Navigate to your phone&apos;s <code>Settings &gt; Apps &gt; {appTitle} &gt; Storage &gt; Clear Data / Clear Cache</code>.
              </li>
              <li>
                <strong>Reset Google Advertising ID:</strong> Go to Android <code>Settings &gt; Google &gt; Ads &gt; Delete advertising ID</code> to prevent cross-app ad tracking.
              </li>
            </ul>
          </section>

          {/* Section 4: Data Retention & Timeline */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span>4. Data Retention Period</span>
            </h2>
            <div className="p-5 rounded-2xl border border-white/10 bg-[#151624] space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-white font-semibold">
                <FiClock className="h-4 w-4 text-red-400" />
                <span>Deletion Timeline:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                When you submit an account deletion request via the app or email, all user credentials, cloud save records, and gameplay snapshots are <strong>permanently deleted within 7 business days</strong>. No identifiable backup archives are retained beyond 30 days.
              </p>
            </div>
          </section>

          {/* Section 5: Developer Contact */}
          <section className="p-6 sm:p-8 rounded-2xl border border-red-500/20 bg-[#141522] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
              <FiMail className="h-5 w-5 text-red-400" />
              <span>Contact the Developer</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              For any questions regarding account deletion, GDPR/CCPA rights, or data protection for <strong>{appTitle}</strong>, please contact:
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm font-mono pt-1">
              <div>Developer: <strong className="text-white">{developerName}</strong></div>
              <div>Email: <a href={`mailto:${contactEmail}`} className="text-red-400 underline font-semibold">{contactEmail}</a></div>
              <div>Application: <strong className="text-white">{appTitle} ({appPackage})</strong></div>
              <div>Website: <Link href="/" className="text-red-400 underline font-semibold">apps.shivamshankhdhar.dev</Link></div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="pt-6 pb-12 text-center text-xs text-slate-500 space-y-2">
          <p>© {new Date().getFullYear()} {developerName}. All rights reserved.</p>
          <p>
            {appTitle} • Package: <code className="font-mono text-red-400">{appPackage}</code>
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              href={productOverviewUrl}
              className="inline-flex items-center gap-1 font-semibold text-red-400 hover:underline"
            >
              <FiArrowLeft className="h-3 w-3" />
              <span>{appTitle} Overview</span>
            </Link>
            <span>•</span>
            <Link
              href={privacyPolicyUrl}
              className="font-semibold text-red-400 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
