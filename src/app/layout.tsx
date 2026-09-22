import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://apps.shivamshankhdhar.dev'),
  openGraph: {
    title: 'Shivam Apps Hub - Production Android Games & Applications',
    description:
      'Explore production mobile applications and board games engineered with low-latency native modules, Stockfish AI, and WebSocket real-time multiplayer.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#09090b] text-slate-100 antialiased selection:bg-red-500 selection:text-white flex flex-col justify-between">
        <Header />
        <div className="flex-grow pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
