import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopProgressBar from '@/components/ui/TopProgressBar';
import connectDB, { isDbConfigured } from '@/lib/db';
import Profile from '@/models/Profile';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Shivam Apps Hub - Production Android Games & Applications',
  description:
    'Official application portal and game showcase by Shivam Shankhdhar. Explore Chess Binge, Ludo Binge, FlowTask, and native Android production apps engineered with React Native and Expo.',
  keywords: [
    'Android Apps',
    'Mobile Games',
    'Chess Binge',
    'Ludo Binge',
    'React Native',
    'Expo',
    'Stockfish AI',
    'Shivam Shankhdhar',
    'Mobile Development',
  ],
  authors: [{ name: 'Shivam Shankhdhar' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://apps.shivamshankhdhar.online'),
  openGraph: {
    title: 'Shivam Apps Hub - Production Android Games & Applications',
    description:
      'Official application portal and game showcase by Shivam Shankhdhar. Explore Chess Binge, Ludo Binge, FlowTask, and native Android production apps engineered with React Native and Expo.',
    type: 'website',
  },
  other: {
    'google-adsense-account': 'ca-pub-1113302487630583',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://shivamshankhdhar.online';
  try {
    if (isDbConfigured()) {
      await connectDB();
      const profile = await Profile.findOne().lean();
      if (profile?.portfolioUrl) {
        portfolioUrl = profile.portfolioUrl;
      }
    }
  } catch (err) {
    console.error('Error fetching profile in RootLayout:', err);
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1113302487630583" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1113302487630583"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-[#09090b] text-slate-100 antialiased selection:bg-red-500 selection:text-white flex flex-col justify-between">
        <TopProgressBar />
        <Header initialPortfolioUrl={portfolioUrl} />
        <div className="flex-grow pt-16">{children}</div>
        <Footer initialPortfolioUrl={portfolioUrl} />
      </body>
    </html>
  );
}
