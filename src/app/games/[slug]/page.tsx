import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FiSmartphone,
  FiZap,
  FiShield,
  FiArrowLeft,
  FiCheckCircle,
  FiShare2,
  FiCpu,
  FiExternalLink,
} from 'react-icons/fi';
import { FaGamepad, FaGooglePlay, FaStar } from 'react-icons/fa6';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';
import GameDetailClient from './GameDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getGame(slug: string): Promise<AppItem | null> {
  const normalizedSlug = slug.toLowerCase().trim();

  try {
    if (isDbConfigured()) {
      const conn = await connectDB();
      if (conn) {
        const app = await App.findOne({
          $or: [
            { package: normalizedSlug },
            { id: normalizedSlug },
            { title: { $regex: new RegExp(`^${normalizedSlug.replace(/-/g, ' ')}$`, 'i') } },
          ],
        });

        if (app) {
          return JSON.parse(JSON.stringify(app));
        }
      }
    }
  } catch (err) {
    console.error('Error fetching game:', err);
  }

  // Fallback to defaultApps
  const fallback = defaultApps.find(
    (a) =>
      a.id?.toLowerCase() === normalizedSlug ||
      a.package?.toLowerCase() === normalizedSlug ||
      a.title?.toLowerCase().replace(/\s+/g, '-') === normalizedSlug ||
      (normalizedSlug === 'ludo' && a.id === 'ludo-binge') ||
      (normalizedSlug === 'chess' && a.id === 'chess-binge')
  );

  return fallback || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) {
    return { title: 'Game Not Found | Shivam Apps Hub' };
  }

  return {
    title: `${game.title} - ${game.subtitle || 'Android Mobile Game'} | Shivam Apps Hub`,
    description: game.tagline,
  };
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) {
    notFound();
  }

  return <GameDetailClient game={game} />;
}
