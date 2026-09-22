'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink, FiMenu, FiX, FiSmartphone, FiShield } from 'react-icons/fi';
import { FaGamepad, FaGooglePlay } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://shivamshankhdhar.dev';

  const navLinks = [
    { href: '/apps', label: 'Applications' },
    { href: '/games', label: 'Games Showcase' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/85 backdrop-blur-xl border-b border-red-500/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
              <FiSmartphone className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-white">
                  SHIVAM <span className="text-red-500">APPS</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  HUB
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">
                Production Android Showcase
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-red-400 hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Links */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-red-500/10 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/40 transition-all shadow-xs"
            >
              <span>Main Portfolio</span>
              <FiExternalLink className="h-3.5 w-3.5" />
            </a>

            <Link
              href="/games"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/25 transition-all"
            >
              <FaGamepad className="h-3.5 w-3.5" />
              <span>Play Games</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
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
            className="md:hidden border-b border-red-500/20 bg-[#0c0d14]/95 backdrop-blur-xl px-4 py-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-400"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                <span>Visit Main Portfolio</span>
                <FiExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
