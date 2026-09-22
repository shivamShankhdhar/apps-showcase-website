'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

export interface ArchitectureCardProps {
  index: number;
  icon: IconType;
  title: string;
  badge: string;
  description: string;
  techTag: string;
  metricLabel: string;
  metricValue: string;
  accent: 'emerald' | 'sky' | 'violet' | 'rose';
}

const colorMap = {
  emerald: {
    borderHover: 'hover:border-emerald-500/50',
    topLine: 'from-emerald-500/0 via-emerald-400 to-emerald-500/0',
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    glow: 'group-hover:bg-emerald-500/15',
    metricText: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  sky: {
    borderHover: 'hover:border-sky-500/50',
    topLine: 'from-sky-500/0 via-sky-400 to-sky-500/0',
    iconBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20 group-hover:bg-sky-500/20',
    badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    glow: 'group-hover:bg-sky-500/15',
    metricText: 'text-sky-400',
    dot: 'bg-sky-400',
  },
  violet: {
    borderHover: 'hover:border-violet-500/50',
    topLine: 'from-violet-500/0 via-violet-400 to-violet-500/0',
    iconBg: 'bg-violet-500/10 text-violet-400 border-violet-500/20 group-hover:bg-violet-500/20',
    badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
    glow: 'group-hover:bg-violet-500/15',
    metricText: 'text-violet-400',
    dot: 'bg-violet-400',
  },
  rose: {
    borderHover: 'hover:border-rose-500/50',
    topLine: 'from-rose-500/0 via-rose-400 to-rose-500/0',
    iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20 group-hover:bg-rose-500/20',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
    glow: 'group-hover:bg-rose-500/15',
    metricText: 'text-rose-400',
    dot: 'bg-rose-400',
  },
};

export default function ArchitectureCard({
  index,
  icon: Icon,
  title,
  badge,
  description,
  techTag,
  metricLabel,
  metricValue,
  accent,
}: ArchitectureCardProps) {
  const c = colorMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -7, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
      className={`group relative rounded-3xl bg-gradient-to-b from-[#141522]/95 to-[#0b0c12]/95 border border-white/10 ${c.borderHover} p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden`}
    >
      {/* Laser shimmer across top edge on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.topLine} opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-out z-20 pointer-events-none`}
      />

      {/* Ambient background bloom on hover */}
      <div
        className={`absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${c.glow}`}
      />

      <div className="space-y-4 relative z-10">
        {/* Top bar: Icon and Badge */}
        <div className="flex items-center justify-between gap-3">
          <div
            className={`h-12 w-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-xs ${c.iconBg} group-hover:scale-110 group-hover:rotate-2`}
          >
            <Icon className="h-6 w-6" />
          </div>

          <span
            className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border shadow-xs ${c.badgeBg}`}
          >
            {badge}
          </span>
        </div>

        {/* Title and Tech Tag */}
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-slate-100 transition-colors">
            {title}
          </h4>
          <p className="text-[11px] font-mono text-slate-400">
            {techTag}
          </p>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Telemetry Metric Footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs relative z-10">
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
          <span className={`h-1.5 w-1.5 rounded-full ${c.dot} animate-pulse`} />
          <span>{metricLabel}</span>
        </div>
        <span className={`font-mono font-bold text-xs ${c.metricText}`}>
          {metricValue}
        </span>
      </div>
    </motion.div>
  );
}
