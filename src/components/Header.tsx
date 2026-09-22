'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink, FiMenu, FiX, FiSmartphone, FiShield } from 'react-icons/fi';
import { FaGamepad, FaGooglePlay, FaDiceD6, FaChessKnight } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://shivamshankhdhar.dev';

  const navLinks = [
    { href: '/games/chess-binge', label: 'Chess Binge', icon: FaChessKnight, color: 'text-rose-400' },
    { href: '/games/ludo-binge', label: 'Ludo Binge', icon: FaDiceD6, color: 'text-amber-400' },
    { href: '/games', label: 'Games Hub', icon: FaGamepad, color: 'text-red-400' },
    { href: '/privacy-policy', label: 'Privacy Policy', icon: FiShield, color: 'text-emerald-400' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/85 backdrop-blur-xl border-b border-red-500/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
              <FaGamepad className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-white">
                  BINGE <span className="text-red-500">GAMES</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  STUDIO
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">
                Offline Android Games Franchise
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const IconComp = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <IconComp className={`h-3.5 w-3.5 ${link.color}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Links */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-red-500/10 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/40 transition-all shadow-xs"
            >
              <span>Developer Portfolio</span>
              <FiExternalLink className="h-3.5 w-3.5" />
            </a>

            <Link
              href="/games"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/25 transition-all"
            >
              <FaGamepad className="h-3.5 w-3.5" />
              <span>Explore Titles</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-[#0c0d14] px-4 pt-2 pb-6 space-y-3"
          >
            {navLinks.map((link) => {
              const IconComp = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-red-400 transition-colors"
                >
                  <IconComp className={`h-4 w-4 ${link.color}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <span>Developer Portfolio</span>
              <FiExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
