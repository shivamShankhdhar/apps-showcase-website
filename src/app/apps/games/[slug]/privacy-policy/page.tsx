import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FiArrowLeft,
  FiExternalLink,
  FiShield,
  FiLock,
  FiCheckCircle,
  FiMail,
  FiClock,
  FiFileText,
  FiChevronRight,
  FiInfo,
  FiGlobe,
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

  const title = game ? `Privacy Policy - ${game.title}` : 'Game Privacy Policy';
  const description = `Official Google Play Privacy Policy for ${game?.title || 'Mobile Game'} (${game?.package || 'Android App'}). Full disclosure on local storage, offline state, and Google AdMob integration.`;

  return {
    title: `${title} | Shivam Apps Hub`,
    description,
    keywords: [
      game?.title || 'Game',
      'Privacy Policy',
      `${game?.title || 'Game'} Privacy Policy`,
      'Google Play Privacy Policy',
      'Shivam Shankhdhar',
      'Android Game Privacy',
    ],
  };
}

const sections = [
  { id: 'overview', title: '1. Overview' },
  { id: 'collection', title: '2. Information Collected' },
  { id: 'third-party', title: '3. AdMob & Services' },
  { id: 'permissions', title: '4. Permissions' },
  { id: 'children', title: "5. Children's Privacy" },
  { id: 'deletion', title: '6. Data Deletion' },
  { id: 'gdpr-ccpa', title: '7. GDPR & CCPA' },
  { id: 'security', title: '8. Security' },
  { id: 'updates', title: '9. Updates' },
  { id: 'contact', title: '10. Contact' },
];

export default async function GamePrivacyPolicyPage({ params }: PageProps) {
  const { slug } = await params;

  const game = defaultApps.find(
    (a) =>
      a.id?.toLowerCase() === slug.toLowerCase() ||
      a.package?.toLowerCase() === slug.toLowerCase() ||
      a.title?.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  );

  const isChess = slug.toLowerCase().includes('chess');
  const isLudo = slug.toLowerCase().includes('ludo');

  if (!game && !isChess && !isLudo) {
    notFound();
  }

  const appTitle = game?.title || (isChess ? 'Chess Binge' : 'Ludo Binge');
  const appPackage = game?.package || (isChess ? 'chess.binge' : 'ludo.binge');
  const effectiveDate = isChess ? 'September 19, 2026' : 'September 22, 2026';
  const productOverviewUrl = `/apps/games/${game?.id || slug}`;

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
            <span className="text-slate-200 font-semibold">Privacy Policy</span>
          </nav>

          <Link
            href={productOverviewUrl}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-[#12131c] text-slate-300 hover:text-white hover:border-red-500/40 transition-all font-mono text-xs"
          >
            <FiArrowLeft className="h-3.5 w-3.5 text-red-400" />
            <span>App Overview</span>
          </Link>
        </div>

        {/* Header Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#13141f] via-[#0f1017] to-[#1c0f14] text-white p-7 sm:p-10 shadow-2xl border border-red-500/20">
          {/* Ambient Glow */}
          <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-gradient-to-br from-red-600/20 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
              <FiShield className="h-3.5 w-3.5 text-red-400" />
              <span>Google Play Compliant • Official Privacy Disclosure</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Privacy Policy for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">{appTitle}</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              This Privacy Policy explains how <strong>{appTitle}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the App&rdquo;), developed by <strong>Shivam Shankhdhar</strong>, handles, processes, and protects your information when you install and play our mobile game on Android.
            </p>

            {/* App Meta Chips */}
            <div className="pt-2 flex flex-wrap gap-2 sm:gap-3 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2 font-mono">
                <span className="text-slate-400">Package:</span>
                <code className="text-red-400 font-semibold">{appPackage}</code>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <span className="text-slate-400">Developer:</span>
                <span className="font-semibold text-white">Shivam Shankhdhar</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <FiClock className="h-3.5 w-3.5 text-red-400" />
                <span className="text-slate-400">Effective:</span>
                <span className="font-semibold text-white">{effectiveDate}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <span className="text-slate-400">Status:</span>
                <span className="font-semibold text-emerald-400">{game?.status || 'Production'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Jump Navigation Bar */}
        <div className="p-4 rounded-2xl border border-white/10 bg-[#0f1017]/90 backdrop-blur-xl shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-red-400 mb-2.5 flex items-center gap-1.5 font-mono">
            <FiFileText className="h-3.5 w-3.5" />
            <span>Table of Contents</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#141522] text-slate-300 hover:text-white hover:bg-red-950/40 border border-white/5 transition"
              >
                {sec.title}
              </a>
            ))}
          </div>
        </div>

        {/* Policy Body Container */}
        <div className="space-y-10 p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#0f1017]/90 backdrop-blur-xl shadow-xl shadow-red-950/5 leading-relaxed text-sm sm:text-base">
          
          {/* Section 1: Executive Summary */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>1. Overview &amp; Privacy Principles</span>
            </h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              Your privacy is fundamental to us. {appTitle} is engineered with a <strong>privacy-first, offline-ready architecture</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#141522] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <FiCheckCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>No Account Required</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No sign-up, email address, phone number, social login, or credentials required to play.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141522] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <FiLock className="h-4 w-4 text-red-400 shrink-0" />
                  <span>Local-First Storage</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isChess
                    ? 'Match moves, board FEN strings, ELO rating, and cosmetic preferences stay exclusively on your device.'
                    : 'Turn state model (ludo-binge-offline-v2), theme selections, dice styles, and coin balances stay exclusively on your device.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141522] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <FiShield className="h-4 w-4 text-red-400 shrink-0" />
                  <span>No Data Selling</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We never harvest, sell, rent, or trade your personal data to brokers, data aggregators, or marketing firms.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141522] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <FiInfo className="h-4 w-4 text-red-400 shrink-0" />
                  <span>Transparent Ads (Google AdMob)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Google AdMob delivers in-game ads (rewarded video hints and fortune spins) to support free offline gameplay.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Information Collected */}
          <section id="collection" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>2. Information We Collect &amp; How We Use It</span>
            </h2>
            
            <h3 className="text-base font-bold text-white mt-4 mb-2">
              A. Information Stored Locally on Your Device
            </h3>
            <p className="mb-3 text-slate-300">
              The App stores gameplay parameters in your device&apos;s sandboxed local storage:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-300 mb-4 text-sm">
              {isChess ? (
                <>
                  <li>Current board state, FEN strings, and move histories (for the &ldquo;Continue Match&rdquo; session recovery).</li>
                  <li>Offline match statistics, win/loss records, and ELO rating progression.</li>
                  <li>Virtual currency balance (Binge Coins) and unlocked luxury Staunton board and avatar themes.</li>
                  <li>User preferences (sound volume, background music toggle, haptic tactile vibration).</li>
                </>
              ) : (
                <>
                  <li>Current turn state and board position (ludo-binge-offline-v2 format for deterministic auto-pause &amp; resume).</li>
                  <li>Single-device pass-and-play local player nicknames and color quadrant selections.</li>
                  <li>Virtual currency balance (LD Coins), fortune wheel streak counters, and unlocked cosmetic dice/arena styles.</li>
                  <li>Audio synthesis settings and haptic feedback toggles.</li>
                </>
              )}
            </ul>

            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
              <FiInfo className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Local gameplay data never leaves your device and is not synchronized to an external central database. Clearing app data in Android settings or uninstalling the app permanently deletes this local data.
              </span>
            </div>

            <h3 className="text-base font-bold text-white mt-6 mb-2">
              B. Automatically Collected Technical &amp; Advertising Data
            </h3>
            <p className="mb-3 text-slate-300">
              When running with an active internet connection, third-party software development kits (SDKs)&mdash;primarily <strong>Google AdMob</strong>&mdash;automatically collect standard technical diagnostics and advertising telemetry:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-300 text-sm">
              <li><strong>Device Identifiers:</strong> Google Advertising ID (GAID / AAID), vendor identifiers, and hardware characteristics.</li>
              <li><strong>Technical Diagnostics:</strong> Operating system version, device model/manufacturer, screen resolution, language settings, and crash telemetry.</li>
              <li><strong>Network Information:</strong> Coarse IP address (used to determine general country or city for localized ad delivery).</li>
              <li><strong>Ad Interaction Data:</strong> Ad impressions, click-through events, completion of rewarded video ads (e.g. to grant free hints or wheel spins), and fraud prevention telemetry.</li>
            </ul>
          </section>

          {/* Section 3: Third-Party Services & Google AdMob */}
          <section id="third-party" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>3. Third-Party Services &amp; Advertising Providers</span>
            </h2>
            <p className="mb-4 text-slate-300">
              {appTitle} integrates third-party services that may collect information used to identify you and display contextual or personalized advertisements:
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-white/10 bg-[#141522]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-white text-base">Google AdMob (Google LLC)</h4>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    Ad Network
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-3 leading-relaxed">
                  Used to deliver banner, interstitial, rewarded video, and app-open ads. Google processes device identifiers, location, and interaction logs in accordance with Google&apos;s Privacy Policy.
                </p>
                <div className="flex flex-wrap gap-3 text-xs font-semibold">
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Google Privacy Policy</span>
                    <FiExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Google Ads Technologies</span>
                    <FiExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Personalized Ads Settings</span>
                    <FiExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-[#141522]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-white text-base">Expo / React Native Framework</h4>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    Runtime
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-3 leading-relaxed">
                  Used for core mobile application execution, hardware graphics rendering, audio playback, and haptic feedback.
                </p>
                <a
                  href="https://expo.dev/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-red-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Expo Privacy Policy</span>
                  <FiExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </section>

          {/* Section 4: Notifications & Permissions */}
          <section id="permissions" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>4. Device Permissions</span>
            </h2>
            <p className="mb-4 text-slate-300">
              {appTitle} requests minimal system permissions strictly necessary to deliver core features:
            </p>

            <div className="border border-white/10 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#151624] border-b border-white/10 text-white">
                      <th className="py-3 px-4 font-bold">Permission</th>
                      <th className="py-3 px-4 font-bold">Purpose</th>
                      <th className="py-3 px-4 font-bold">Scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr>
                      <td className="py-3 px-4 font-mono font-semibold text-red-400 text-xs">
                        INTERNET &amp; ACCESS_NETWORK_STATE
                      </td>
                      <td className="py-3 px-4">Retrieves Google AdMob advertisements and checks connectivity.</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                          Required for Ads
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-semibold text-red-400 text-xs">
                        VIBRATE
                      </td>
                      <td className="py-3 px-4">Provides tactile haptic feedback during piece moves, dice rolls, and turn cues.</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 text-slate-400">
                          Optional
                        </span>
                      </td>
                    </tr>
                    {isChess && (
                      <>
                        <tr>
                          <td className="py-3 px-4 font-mono font-semibold text-red-400 text-xs">
                            POST_NOTIFICATIONS
                          </td>
                          <td className="py-3 px-4">Local daily reminders (1 PM, 6 PM, 8 PM) and tactical puzzle tips.</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 text-slate-400">
                              Optional (Opt-in)
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-mono font-semibold text-red-400 text-xs">
                            SCHEDULE_EXACT_ALARM
                          </td>
                          <td className="py-3 px-4">Triggers local notifications at exact scheduled daily times.</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 text-slate-400">
                              Optional
                            </span>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              You can review or revoke permissions at any time via Android: <code>Settings &gt; Apps &gt; {appTitle} &gt; Permissions</code>.
            </p>
          </section>

          {/* Section 5: Children's Privacy */}
          <section id="children" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>5. Children&apos;s Privacy (COPPA &amp; GDPR-K)</span>
            </h2>
            <p className="mb-3 text-slate-300">
              {appTitle} is intended for general audiences aged 13 and older (or aged 16 and older in the European Union).
            </p>
            <p className="text-slate-300">
              We do not knowingly collect, solicit, or maintain personally identifiable information from children under the age of 13. If you believe that a child has provided us with personal information, or if Google AdMob has inadvertently gathered such data, please contact us immediately at <a href="mailto:s.shankhdhar1981@gmail.com" className="text-red-400 font-semibold underline">s.shankhdhar1981@gmail.com</a>, and we will take immediate measures to remove the information.
            </p>
          </section>

          {/* Section 6: Data Retention & User Deletion Rights */}
          <section id="deletion" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>6. Data Retention, Control &amp; Deletion Rights</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm sm:text-base">
              <p>
                <strong>How to Delete Your Gameplay Data:</strong> Since your game data is stored exclusively on your device, you can delete all records, history, scores, and unlocked assets at any time by navigating to <code>Settings &gt; Apps &gt; {appTitle} &gt; Storage &gt; Clear Storage / Clear Data</code>, or by uninstalling the application.
              </p>
              <p>
                <strong>How to Opt-Out of Targeted Advertising:</strong> You can reset or delete your Google Advertising ID on Android via <code>Settings &gt; Google &gt; Ads &gt; Delete advertising ID</code>. Once deleted, advertisers will no longer be able to associate ad activity across different apps with your device.
              </p>
              <p>
                <strong>Inquiries &amp; Deletion Requests:</strong> For any questions regarding privacy or data rights, contact us at <a href="mailto:s.shankhdhar1981@gmail.com" className="text-red-400 font-semibold underline">s.shankhdhar1981@gmail.com</a>. We respond promptly within 30 days.
              </p>
            </div>
          </section>

          {/* Section 7: GDPR & CCPA Legal Rights */}
          <section id="gdpr-ccpa" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>7. Rights for European (GDPR) &amp; California (CCPA) Users</span>
            </h2>
            <p className="mb-3 text-slate-300">
              Depending on your location, you may have specific rights under data protection laws such as the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-300 text-sm">
              <li><strong>Right of Access &amp; Portability:</strong> Request details regarding data collected by third-party advertising partners.</li>
              <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Delete your stored local data and request removal of ad identifiers.</li>
              <li><strong>Right to Opt-Out of Ad Sale/Sharing:</strong> We do not sell personal data. You can opt out of personalized tracking via device ad settings.</li>
              <li><strong>Right to Non-Discrimination:</strong> You will receive equal gameplay service and functionality regardless of exercising your privacy rights.</li>
            </ul>
          </section>

          {/* Section 8: Security */}
          <section id="security" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>8. Security of Information</span>
            </h2>
            <p className="text-slate-300">
              We prioritize the security of your data. The App leverages Android&apos;s native application sandboxing to isolate local storage from other applications on your device. Network communication conducted by advertising SDKs utilizes encrypted Transport Layer Security (HTTPS/TLS) protocols.
            </p>
          </section>

          {/* Section 9: Updates */}
          <section id="updates" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>9. Updates to This Privacy Policy</span>
            </h2>
            <p className="text-slate-300">
              We may periodically update this Privacy Policy to reflect app enhancements, legal requirements, or advertising policy updates. Any changes will be published directly on this page with a revised &ldquo;Effective Date&rdquo;. We recommend checking this page periodically to stay informed.
            </p>
          </section>

          {/* Section 10: Contact Us */}
          <section id="contact" className="scroll-mt-20 p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#141522] space-y-4">
            <div className="flex items-center gap-2">
              <FiMail className="h-5 w-5 text-red-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                10. Contact Information
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              If you have questions, suggestions, or concerns regarding this Privacy Policy or our practices, please reach out to the developer:
            </p>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap gap-1">
                <span className="text-slate-500">Developer:</span>
                <span className="font-semibold text-white">Shivam Shankhdhar</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-slate-500">Email:</span>
                <a
                  href="mailto:s.shankhdhar1981@gmail.com"
                  className="font-semibold text-red-400 hover:underline"
                >
                  s.shankhdhar1981@gmail.com
                </a>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-slate-500">Application:</span>
                <span className="font-semibold text-white">{appTitle} (Android) • Package: {appPackage}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-slate-500">Developer&apos;s Release Portal:</span>
                <Link href="/" className="font-semibold text-red-400 hover:underline">
                  Shivam Apps Hub (Official Portal)
                </Link>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="pt-6 pb-12 text-center text-xs text-slate-400 space-y-2">
          <p>© {new Date().getFullYear()} Shivam Shankhdhar. All rights reserved.</p>
          <p>
            {appTitle} • Package: <code className="font-mono text-red-400">{appPackage}</code>
          </p>
          <div className="pt-2">
            <Link
              href={productOverviewUrl}
              className="inline-flex items-center gap-1.5 font-semibold text-red-400 hover:underline"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              <span>Back to {appTitle} App Overview</span>
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
