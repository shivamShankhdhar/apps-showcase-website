'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink, FiMenu, FiX, FiLayers, FiShield, FiCpu, FiGrid } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  initialPortfolioUrl?: string;
}

export default function Header({ initialPortfolioUrl }: HeaderProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState(
    initialPortfolioUrl || process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://shivamshankhdhar.dev'
  );

  React.useEffect(() => {
    if (initialPortfolioUrl) {
      setPortfolioUrl(initialPortfolioUrl);
    }
  }, [initialPortfolioUrl]);

  React.useEffect(() => {
    fetch('/api/profile?t=' + Date.now(), { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data?.portfolioUrl) {
          setPortfolioUrl(data.portfolioUrl);
        }
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { href: '/apps', label: 'Apps', icon: FiGrid },
    { href: '/#architecture', label: 'Architecture', icon: FiCpu },
    { href: '/privacy-policy', label: 'Privacy & Compliance', icon: FiShield },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-b border-white/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <FiLayers className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold tracking-tight text-white">
                  SHIVAM <span className="text-red-500 font-semibold">SOFTWARE</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 uppercase tracking-wider">
                  Mobile Lab
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-normal hidden sm:block">
                Native Android Systems & Board Engines
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icon className="h-3.5 w-3.5 text-slate-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions Column */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-red-500/40 transition-all shadow-xs"
            >
              <span>Developer Portfolio</span>
              <FiExternalLink className="h-3 w-3 text-red-400" />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              aria-label="Toggle navigation menu"
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
            className="md:hidden border-b border-white/10 bg-[#09090b] px-4 pt-2 pb-6 space-y-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
