import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';
import ProductOverviewClient from './ProductOverviewClient';

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
    return { title: 'Product Not Found | Software Systems Directory' };
  }

  return {
    title: `${game.title} - Complete Technical Specifications & Overview`,
    description: game.tagline,
  };
}

export default async function ProductOverviewPage({ params }: PageProps) {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) {
    notFound();
  }

  return <ProductOverviewClient game={game} />;
}
