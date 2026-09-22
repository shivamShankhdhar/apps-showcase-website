import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps } from '@/lib/defaultData';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    if (!isDbConfigured()) {
      if (category) {
        const filtered = defaultApps.filter(
          (a) => a.category.toLowerCase() === category.toLowerCase()
        );
        return NextResponse.json(filtered);
      }
      return NextResponse.json(defaultApps);
    }

    const conn = await connectDB();
    if (!conn) {
      if (category) {
        const filtered = defaultApps.filter(
          (a) => a.category.toLowerCase() === category.toLowerCase()
        );
        return NextResponse.json(filtered);
      }
      return NextResponse.json(defaultApps);
    }

    const query: any = {};
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const apps = await App.find(query).sort({ order: 1, createdAt: -1 });

    if (!apps || apps.length === 0) {
      if (category) {
        const filtered = defaultApps.filter(
          (a) => a.category.toLowerCase() === category.toLowerCase()
        );
        return NextResponse.json(filtered);
      }
      return NextResponse.json(defaultApps);
    }

    return NextResponse.json(apps);
  } catch (error) {
    console.error('Error fetching apps in API route:', error);
    return NextResponse.json(defaultApps, { status: 200 });
  }
}
