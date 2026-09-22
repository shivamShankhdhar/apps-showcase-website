import React from 'react';
import Link from 'next/link';
import { FiSmartphone, FiShield, FiFileText, FiExternalLink, FiHeart } from 'react-icons/fi';
import { FaGooglePlay, FaGamepad } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://shivamshankhdhar.dev';

  return (
    <footer className="border-t border-red-500/20 bg-[#07070a] text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Description */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white text-base shadow-sm">
                📱
              </div>
              <span className="text-base font-black text-white tracking-tight">
                SHIVAM <span className="text-red-500">APPS</span> HUB
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Official application hub and release portal for production Android mobile titles developed by Shivam Shankhdhar. Designed for ultra-low latency, native performance, and 100% data privacy.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
              >
                <span>Visit Developer Portfolio</span>
                <FiExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Featured Titles
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/games" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <FaGamepad className="h-3 w-3 text-red-500" />
                  <span>Chess Binge (Android)</span>
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <FaGamepad className="h-3 w-3 text-red-500" />
                  <span>Ludo Binge (Closed Testing)</span>
                </Link>
              </li>
              <li>
                <Link href="/#apps" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <FiSmartphone className="h-3 w-3 text-red-500" />
                  <span>FlowTask Pro & DevLens</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal Column */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Legal & Play Store Compliance
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <FiShield className="h-3 w-3 text-red-500" />
                  <span>Developer Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/apps/games/chess-binge/privacy-policy" className="hover:text-red-400 transition-colors">
                  Chess Binge Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/apps/games/ludo-binge/privacy-policy" className="hover:text-red-400 transition-colors">
                  Ludo Binge Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <FiFileText className="h-3 w-3 text-red-500" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {currentYear} Shivam Shankhdhar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Engineered with React Native, Expo & Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
