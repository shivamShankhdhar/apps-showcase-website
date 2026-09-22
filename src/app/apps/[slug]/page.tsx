import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps, AppItem } from '@/lib/defaultData';
import AppDetailClient from './AppDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getApp(slug: string): Promise<AppItem | null> {
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
    console.error('Error fetching app:', err);
  }

  const fallback = defaultApps.find(
    (a) =>
      a.id?.toLowerCase() === normalizedSlug ||
      a.package?.toLowerCase() === normalizedSlug ||
      a.title?.toLowerCase().replace(/\s+/g, '-') === normalizedSlug
  );

  return fallback || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getApp(slug);

  if (!app) {
    return { title: 'App Not Found | Shivam Apps Hub' };
  }

  return {
    title: `${app.title} - ${app.subtitle || 'Android Application'} | Shivam Apps Hub`,
    description: app.tagline,
  };
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = await getApp(slug);

  if (!app) {
    notFound();
  }

  return <AppDetailClient app={app} />;
}
