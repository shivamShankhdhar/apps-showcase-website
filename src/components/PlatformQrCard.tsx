'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { FiSmartphone, FiCopy, FiCheck, FiExternalLink, FiClock, FiAlertCircle } from 'react-icons/fi';
import { FaGooglePlay, FaApple, FaAndroid } from 'react-icons/fa6';
import { AppItem } from '@/lib/defaultData';

interface PlatformQrCardProps {
  game: AppItem;
  className?: string;
}

export default function PlatformQrCard({ game, className = '' }: PlatformQrCardProps) {
  const [platform, setPlatform] = useState<'android' | 'ios'>('android');
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const hasAndroidLink = Boolean(
    game.playStoreUrl && game.playStoreUrl.trim().startsWith('http')
  );
  const hasIosLink = Boolean(
    game.appStoreUrl && game.appStoreUrl.trim().startsWith('http')
  );

  const isCurrentPlatformAvailable = platform === 'android' ? hasAndroidLink : hasIosLink;

  // If there is a real store link, use it; otherwise generate a valid anchor URL pointing to the game page's Coming Soon roadmap
  const currentUrl =
    platform === 'android'
      ? hasAndroidLink
        ? game.playStoreUrl!
        : typeof window !== 'undefined'
        ? `${window.location.href.split('#')[0]}#coming-soon`
        : `https://apps.shivamshankhdhar.dev/apps/games/${game.package}#coming-soon`
      : hasIosLink
      ? game.appStoreUrl!
      : typeof window !== 'undefined'
      ? `${window.location.href.split('#')[0]}#coming-soon`
      : `https://apps.shivamshankhdhar.dev/apps/games/${game.package}#coming-soon`;

  useEffect(() => {
    QRCode.toDataURL(currentUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((dataUrl) => setQrUrl(dataUrl))
      .catch((err) => console.error('Error generating platform QR code:', err));
  }, [currentUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-3xl bg-[#12131c] border border-white/15 p-6 shadow-2xl space-y-5 relative overflow-hidden ${className}`}
    >
      {/* Background Gradient Glow */}
      <div className="absolute -top-16 -left-16 w-44 h-44 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Platform Switcher Tabs */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <FiSmartphone className="h-3.5 w-3.5 text-red-400" />
            <span>Install on Device</span>
          </span>
          <span className="text-[10px] font-mono text-slate-500">Fast QR Pairing</span>
        </div>

        {/* Platform Toggle Tabs with Real Availability Badges */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-black/50 border border-white/10">
          <button
            type="button"
            onClick={() => setPlatform('android')}
            className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              platform === 'android'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <FaAndroid className="h-3.5 w-3.5" />
              <span>Android</span>
            </div>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${
                hasAndroidLink
                  ? 'bg-white/20 text-white'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {hasAndroidLink ? 'Available' : 'Soon'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPlatform('ios')}
            className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              platform === 'ios'
                ? 'bg-gradient-to-r from-slate-200 to-white text-black shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <FaApple className="h-3.5 w-3.5" />
              <span>iOS</span>
            </div>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${
                hasIosLink
                  ? 'bg-black/20 text-black'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {hasIosLink ? 'Live' : 'Soon'}
            </span>
          </button>
        </div>
      </div>

      {/* Gradient-Framed QR Code Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative group p-1.5 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 shadow-xl shadow-red-600/20 hover:shadow-red-600/30 transition-all">
          <div className="relative rounded-[14px] bg-white p-3 flex items-center justify-center overflow-hidden">
            {qrUrl ? (
              <img
                src={qrUrl}
                alt={`QR Code to install ${game.title} on ${platform === 'android' ? 'Android' : 'iOS'}`}
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
              />
            ) : (
              <div className="w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center text-xs text-slate-500 font-mono">
                Compiling QR...
              </div>
            )}

            {/* Central Platform Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="p-2 rounded-xl bg-white/95 border border-slate-200 shadow-md flex items-center justify-center">
                {platform === 'android' ? (
                  <FaAndroid className="h-5 w-5 text-emerald-600" />
                ) : (
                  <FaApple className="h-5 w-5 text-slate-900" />
                )}
              </div>
            </div>

            {/* Coming Soon Holographic Overlay When Link is Absent */}
            {!isCurrentPlatformAvailable && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] rounded-[14px] flex flex-col items-center justify-center p-4 text-center z-20">
                <div className="h-8 w-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-2">
                  <FiClock className="h-4 w-4 text-amber-300" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                  Coming Soon
                </span>
                <p className="text-xs font-bold text-white">
                  {platform === 'android' ? 'Android Release in Track' : 'iOS Version in Development'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 font-mono">
                  {platform === 'android'
                    ? (game.playStoreStatus || 'Closed Testing in Progress')
                    : (game.appStoreStatus || 'Apple TestFlight Review')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scan instruction */}
        <p className="text-[11px] text-slate-400 font-mono text-center mt-3 flex items-center justify-center gap-1.5">
          {isCurrentPlatformAvailable ? (
            <span>Point your phone camera to scan</span>
          ) : (
            <span className="text-amber-400 flex items-center gap-1">
              <FiAlertCircle className="h-3 w-3" />
              <span>Platform link coming soon &bull; Scan for details</span>
            </span>
          )}
        </p>
      </div>

      {/* Action Buttons: Direct Store Link or Coming Soon State */}
      <div className="space-y-2 relative z-10 pt-1">
        {isCurrentPlatformAvailable ? (
          <a
            href={currentUrl}
            target="_blank"
            rel="noreferrer"
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              platform === 'android'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/25'
                : 'bg-white hover:bg-slate-200 text-black shadow-md'
            }`}
          >
            {platform === 'android' ? (
              <>
                <FaGooglePlay className="h-3.5 w-3.5" />
                <span>
                  {game.status?.toLowerCase().includes('closed')
                    ? 'Join Google Play Closed Track'
                    : 'Open in Google Play Store'}
                </span>
              </>
            ) : (
              <>
                <FaApple className="h-3.5 w-3.5" />
                <span>Open on Apple App Store</span>
              </>
            )}
            <FiExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>
        ) : (
          <div className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {platform === 'android' ? (
                <FaGooglePlay className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <FaApple className="h-3.5 w-3.5 text-slate-300" />
              )}
              <span>
                {platform === 'android'
                  ? `Google Play: ${game.playStoreStatus || 'Coming Soon'}`
                  : `App Store: ${game.appStoreStatus || 'Coming Soon'}`}
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              Coming Soon
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleCopy}
          className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <FiCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">
                {isCurrentPlatformAvailable ? 'Store Link Copied!' : 'Overview URL Copied!'}
              </span>
            </>
          ) : (
            <>
              <FiCopy className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {isCurrentPlatformAvailable ? 'Copy Direct Link' : 'Copy Game Overview Link'}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
