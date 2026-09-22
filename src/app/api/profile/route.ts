import { NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import Profile from '@/models/Profile';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (!isDbConfigured()) return NextResponse.json(null);
    await connectDB();
    const profile = await Profile.findOne().lean();
    return NextResponse.json(profile, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
