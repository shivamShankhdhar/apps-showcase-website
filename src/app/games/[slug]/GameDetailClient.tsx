'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiCopy,
  FiCheck,
  FiShare2,
  FiLock,
  FiLayers,
  FiActivity,
  FiClock,
  FiDownload,
  FiUsers,
  FiCpu,
  FiHelpCircle,
  FiInfo,
  FiExternalLink,
} from 'react-icons/fi';
import { BsQrCode } from 'react-icons/bs';
import { FaGamepad, FaGooglePlay, FaStar, FaDiceD6, FaChessKnight } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { AppItem } from '@/lib/defaultData';
import QRCodeModal from '@/components/QRCodeModal';
import { LudoBoardView } from '@/components/game-boards/LudoBoardView';
import { ChessBoardView } from '@/components/game-boards/ChessBoardView';
import { LudoBackdropArt } from '@/components/3d/LudoBackdropArt';
import AppIcon from '@/components/ui/AppIcon';

interface GameDetailClientProps {
  game: AppItem;
}

type DetailTab = 'rules' | 'specs' | 'changelog' | 'testing';

export default function GameDetailClient({ game }: GameDetailClientProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [diceNumber, setDiceNumber] = useState(6);
  const [activeTab, setActiveTab] = useState<DetailTab>('rules');
  const [lastEvent, setLastEvent] = useState<string>('Game engine initialized &bull; Ready for deployment');

  const isChess =
    game.title.toLowerCase().includes('chess') ||
    game.package.toLowerCase().includes('chess');

  const isTesting =
    game.status?.toLowerCase().includes('closed') ||
    game.status?.toLowerCase().includes('testing') ||
    game.rating?.toLowerCase().includes('coming');

  const shareUrl =
    game.playStoreUrl ||
    (typeof window !== 'undefined' ? window.location.href : 'https://apps.shivamshankhdhar.dev');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDiceRoll = (val: number) => {
    setDiceNumber(val);
    if (val === 6) {
      setLastEvent('Rolled a 6! 🌟 Token unlocked from Citadel Yard. Extra turn granted!');
    } else {
      setLastEvent(`Rolled a ${val}! Advancing token forward along outer track.`);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-red-500/20 bg-[#12131c] text-slate-300 hover:text-red-400 transition-all shadow-xs"
          >
            <FiArrowLeft className="h-3.5 w-3.5 text-red-500" />
            <span>Back to Games Hub</span>
          </Link>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Apps
            </Link>
            <span>/</span>
            <Link href="/games" className="hover:text-red-400 transition-colors">
              Games
            </Link>
            <span>/</span>
            <span className="text-white font-semibold flex items-center gap-1.5">
              <AppIcon title={game.title} category="Games" iconString={game.icon} className="h-3.5 w-3.5" />
              <span>{game.title}</span>
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Game Details Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/15 text-red-400 border border-red-500/30">
                <FaGamepad className="h-3.5 w-3.5" />
                <span>Production Board Game</span>
              </span>

              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  isTesting
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isTesting ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
                  }`}
                />
                <span>{isTesting ? 'Closed Testing Track' : 'Google Play Production'}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10">
                <FiShield className="h-3 w-3 text-emerald-400" />
                <span>Zero Data Tracking</span>
              </span>
            </div>

            {/* Title & Slogan with Vector React Icon */}
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-red-600/20 via-rose-600/20 to-transparent border border-red-500/40 flex items-center justify-center shadow-xl shadow-red-600/20 shrink-0">
                <AppIcon
                  title={game.title}
                  category="Games"
                  iconString={game.icon}
                  className="h-10 w-10"
                />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  {game.title}
                </h1>
                {game.subtitle && (
                  <p className="text-sm sm:text-base font-semibold text-red-400">
                    {game.subtitle}
                  </p>
                )}
                <p className="text-xs font-mono text-slate-400">
                  Package: <span className="text-white">{game.package}</span> &bull; {game.version || 'v1.4.0'}
                </p>
              </div>
            </div>

            {/* Detailed Tagline */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {game.tagline}
            </p>

            {/* Ratings & Telemetry Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 rounded-2xl bg-[#12131c]/80 border border-red-500/20">
              <div className="flex items-center gap-2.5">
                <FaStar className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-base font-bold text-white">{game.rating || '5.0'}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">User Rating</p>
                </div>
              </div>
              <div className="border-l border-white/10 pl-3">
                <p className="text-base font-bold text-white">{game.ratingCount || 'Testing Track'}</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Audience</p>
              </div>
              <div className="border-l border-white/10 pl-3">
                <p className="text-base font-bold text-emerald-400">Verified</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Google Play</p>
              </div>
            </div>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {game.playStoreUrl ? (
                <a
                  href={game.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all"
                >
                  <FaGooglePlay className="h-4 w-4" />
                  <span>Get on Google Play</span>
                </a>
              ) : (
                <button
                  onClick={() => setIsQrOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all"
                >
                  <FaGooglePlay className="h-4 w-4" />
                  <span>Join Closed Testing</span>
                </button>
              )}

              <button
                onClick={() => setIsQrOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <BsQrCode className="h-4 w-4 text-red-500" />
                <span>Mobile QR Code</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Copy Game Link"
              >
                {copied ? <FiCheck className="h-4 w-4 text-emerald-400" /> : <FiCopy className="h-4 w-4" />}
              </button>

              {game.privacyUrl && (
                <Link
                  href={game.privacyUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
                >
                  <FiShield className="h-4 w-4 text-red-500" />
                  <span>Privacy Policy</span>
                </Link>
              )}
            </div>

          </div>

          {/* Right Column: Live Board Simulation with Rotating Celestial Art */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md rounded-[36px] bg-[#12131c] border-2 border-red-500/30 p-6 shadow-2xl space-y-4 relative overflow-hidden">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FiZap className="h-4 w-4 text-red-500" />
                  <span>Live Board Loop</span>
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Hardware 60 FPS
                </span>
              </div>

              {isChess ? (
                /* Chess Authentic Board View */
                <div className="space-y-4">
                  <ChessBoardView />
                </div>
              ) : (
                /* Ludo Authentic Board View with Celestial Backdrop & Interactive Dice */
                <div className="space-y-4">
                  <div className="relative flex flex-col items-center justify-center p-2">
                    <LudoBackdropArt />
                    <div className="relative z-10 w-full">
                      <LudoBoardView onDiceRoll={handleDiceRoll} />
                    </div>
                  </div>

                  {/* Dynamic Interactive Event Log */}
                  <div className="p-3 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <FaDiceD6 className="h-4 w-4 text-amber-400 shrink-0" />
                      <p className="text-slate-300 text-[11px] truncate font-medium">
                        {lastEvent}
                      </p>
                    </div>
                    <span className="font-mono font-bold text-red-400 text-xs shrink-0">
                      Roll: {diceNumber}
                    </span>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-center text-slate-500 font-mono">
                Click dice or pieces to test native canvas response
              </p>
            </div>
          </div>

        </div>

        {/* Telemetry & Architecture Benchmark Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#12131c]/90 border border-red-500/20 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/10 text-red-400 border border-red-500/20 shrink-0">
              <FiZap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">60 FPS Render</h4>
              <p className="text-xs text-slate-400 mt-0.5">Smooth delta-time board refresh</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-600/10 text-amber-400 border border-amber-500/20 shrink-0">
              <FiActivity className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">&lt;35ms Latency</h4>
              <p className="text-xs text-slate-400 mt-0.5">Real-time WebSocket roundtrip</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <FiCpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Heuristic AI</h4>
              <p className="text-xs text-slate-400 mt-0.5">Zero-latency offline bot engines</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Zero Telemetry</h4>
              <p className="text-xs text-slate-400 mt-0.5">100% Client sandbox compliance</p>
            </div>
          </div>
        </div>

        {/* Tabbed Interactive Information Section */}
        <div className="space-y-6">
          
          {/* Tab Selection Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FaGamepad className="h-4 w-4" />
              <span>Gameplay Rules & Mechanics</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FiCpu className="h-4 w-4" />
              <span>Engine Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('changelog')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'changelog'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FiClock className="h-4 w-4" />
              <span>Changelog & History</span>
            </button>

            <button
              onClick={() => setActiveTab('testing')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'testing'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FiDownload className="h-4 w-4" />
              <span>Closed Testing Guide</span>
            </button>
          </div>

          {/* Tab Content 1: Rules & Gameplay Mechanics */}
          {activeTab === 'rules' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isChess ? (
                <>
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FaChessKnight className="text-rose-400 h-5 w-5" />
                      <span>Stockfish Multi-Depth Engine</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Evaluate positions across 20 depths with real-time centipawn analysis. Move recommendations calculate tactical blunders and best continuous branches.
                    </p>
                  </div>
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-400 h-5 w-5" />
                      <span>FIDE Standard Compliance</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Full support for en passant captures, pawn promotions (Queen, Rook, Bishop, Knight), 3-fold repetition detection, 50-move draw rule, and queenside/kingside castling.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs">01</span>
                      <span>Citadel Yard Deployment</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Tokens remain secured in each quadrant heraldic yard. Rolling a <strong>6</strong> on the interactive dice releases a token onto the quadrant starting cell and awards a bonus roll.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs">02</span>
                      <span>Safe Star Sanctuaries</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      8 designated star-marked cells along the 52-cell perimeter grant complete immunity. Tokens occupying a star cell cannot be captured or knocked out by opposing players.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 font-black text-xs">03</span>
                      <span>Knockouts & Bonus Rolls</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Landing on an opponent token on any non-safe cell knocks it out back to its citadel yard and immediately grants the capturing player an additional roll sequence.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 font-black text-xs">04</span>
                      <span>Victory Home Triangle</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      After a complete circuit of the board, tokens enter their home lane. An exact dice roll is required to enter the center celestial sanctuary. First player to park all 4 tokens wins!
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tab Content 2: Architecture Specifications */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {game.features && game.features.length > 0 ? (
                game.features.map((feature, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">{feature.label}</p>
                      <h4 className="text-base font-bold text-white mt-0.5">{feature.value}</h4>
                    </div>
                    <FiCheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20">
                  <p className="text-xs text-slate-400">Specifications configured via database.</p>
                </div>
              )}

              {/* Technologies Pill Grid */}
              <div className="p-6 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-3 md:col-span-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Technology Stack & Compilation Targets
                </h4>
                <div className="flex flex-wrap gap-2">
                  {game.technologies?.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Changelog */}
          {activeTab === 'changelog' && (
            <div className="p-8 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-6">
              <div className="border-l-2 border-red-500/40 pl-6 space-y-6">
                <div className="space-y-1 relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-[#09090b]" />
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">v1.4.0 (Current Release)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">Production</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Added authentic 15x15 vectorized board layout with rotating celestial astrolabe background. Optimized dice physics and WebSocket heartbeat interval.
                  </p>
                </div>

                <div className="space-y-1 relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-slate-600 border-2 border-[#09090b]" />
                  <span className="text-sm font-bold text-white">v1.3.2</span>
                  <p className="text-xs text-slate-400">
                    Enhanced heuristic AI bot response time and safe zone collision handling. Added automatic reconnect token restoration.
                  </p>
                </div>

                <div className="space-y-1 relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-slate-600 border-2 border-[#09090b]" />
                  <span className="text-sm font-bold text-white">v1.0.0</span>
                  <p className="text-xs text-slate-400">
                    Initial Android signed bundle compilation with ProGuard shrinking and zero-tracking privacy sandbox.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 4: Closed Testing Guide */}
          {activeTab === 'testing' && (
            <div className="p-8 rounded-3xl bg-[#12131c] border border-red-500/20 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaGooglePlay className="text-red-500 h-5 w-5" />
                  <span>Google Play Closed Testing Program</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  As an independent developer, Google Play requires participation in a closed testing track before broad public rollout. You can join the testing group instantly:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-red-400 font-mono text-xs font-bold">STEP 1</span>
                  <h5 className="text-xs font-bold text-white">Join Testers Group</h5>
                  <p className="text-[11px] text-slate-400">
                    Submit your Google Play account email via the contact form or QR code scanner.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-red-400 font-mono text-xs font-bold">STEP 2</span>
                  <h5 className="text-xs font-bold text-white">Opt-in on Web</h5>
                  <p className="text-[11px] text-slate-400">
                    Accept the testing invite link on your mobile Android browser via Google Play Console.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-red-400 font-mono text-xs font-bold">STEP 3</span>
                  <h5 className="text-xs font-bold text-white">Download & Enjoy</h5>
                  <p className="text-[11px] text-slate-400">
                    Install updates automatically from the Google Play Store and share feedback.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setIsQrOpen(true)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <BsQrCode className="h-4 w-4" />
                  <span>Scan Mobile Installation QR</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title={game.title}
        url={shareUrl}
      />
    </main>
  );
}
