export interface AppItem {
  _id: string;
  id?: string;
  title: string;
  subtitle?: string;
  tagline: string;
  category: 'Games' | string;
  package: string;
  version?: string;
  status?: string; // 'Production' | 'Closed Testing' | 'Early Access'
  rating?: string;
  ratingCount?: string;
  icon?: string;
  bannerType?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  playStoreStatus?: string;
  appStoreStatus?: string;
  privacyUrl?: string;
  playConsoleUrl?: string;
  featureGraphic?: string;
  playScreenshots?: string[];
  downloadsTier?: string;
  contentRating?: string;
  playProtectVerified?: boolean;
  releaseTrack?: string;
  whatsNew?: string;
  technologies?: string[];
  highlights?: string[];
  features?: Array<{ label: string; value: string }>;
  featured?: boolean;
  order?: number;
  containsAds?: boolean;
}

export const defaultApps: AppItem[] = [
  {
    _id: 'app-chess-binge',
    id: 'chess-binge',
    title: 'Chess Binge',
    subtitle: 'Grandmaster AI & Tactical Move Analysis',
    tagline: 'Offline chess engineered with 4 Bot Intelligence Tiers, deep move evaluations, Chess Academy tactical curriculum, and luxury Staunton themes.',
    category: 'Games',
    package: 'chess.binge',
    version: 'v2.0.2',
    status: 'Production',
    rating: '4.9',
    ratingCount: '500+ Players',
    downloadsTier: '5,000+ Installs',
    contentRating: 'Rated for 3+',
    playProtectVerified: true,
    releaseTrack: 'Google Play Production',
    whatsNew: 'Stockfish 16 native integration, offline move evaluation graph, Elo rating engine, and luxury Staunton themes.',
    icon: 'chess',
    bannerType: 'chess',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=chess.binge',
    playStoreStatus: 'Production',
    appStoreUrl: '',
    appStoreStatus: 'Coming Soon',
    privacyUrl: '/apps/games/chess-binge/privacy-policy',
    technologies: [
      'React Native',
      'Expo SDK',
      'TypeScript',
      'Chess.js Engine',
      'Expo Haptics',
      'Google Mobile Ads',
    ],
    highlights: [
      '4 Bot Intelligence Tiers (Beginner 800 ELO to Master 2000+ ELO)',
      'Pro Match Analysis with Accuracy %, Blunder Detection & Evaluation Radar',
      'Chess Academy Curriculum (Opening Principles, Tactical Drills & Endgames)',
      '6 Luxury Staunton Board Themes & 10 Collectible Player Avatars',
      'Pass & Play (2 Players Offline) with customizable side selection & clocks',
      '100% Offline-First with Instant Game State Recovery & Zero Account Requirement',
    ],
    features: [
      { label: 'Game Modes', value: 'Solo Bot AI & Pass & Play (2P)' },
      { label: 'AI Intelligence', value: '4 Tiers (800 – 2000+ ELO)' },
      { label: 'Analysis Engine', value: 'Move Evaluator & Blunder Radar' },
      { label: 'Interactive Academy', value: 'Tactics, Openings & Endgames' },
      { label: 'Cosmetics', value: '6 Themes & 10 Avatars' },
      { label: 'Daily Rewards', value: 'Fortune Wheel for Coins' },
      { label: 'Package Format', value: 'Signed AAB (chess.binge)' },
      { label: 'Play Store Status', value: 'Production (v2.0.2)' },
    ],
    featured: true,
    order: 1,
    containsAds: true,
  },
  {
    _id: 'app-ludo-binge',
    id: 'ludo-binge',
    title: 'Ludo Binge',
    subtitle: 'Classic Board Game & Offline Club',
    tagline: 'The premier offline Ludo experience featuring Solo VS Computer AI, 2–4 Player Pass & Play on one device, 8 Board Themes, 10 Dice Styles, and Daily Fortune Spin.',
    category: 'Games',
    package: 'ludo.binge',
    version: 'v2.0.2',
    status: 'Closed Testing',
    rating: 'Early Access',
    ratingCount: '20 Active Testers',
    downloadsTier: 'Closed Testing Track',
    contentRating: 'Rated for 3+',
    playProtectVerified: true,
    releaseTrack: 'Google Play Closed Testing Track',
    playScreenshots: [
      '/screenshots/ludo/01_home_lobby.png',
      '/screenshots/ludo/02_game_setup.png',
      '/screenshots/ludo/03_classic_board.png',
      '/screenshots/ludo/04_match_results.png',
      '/screenshots/ludo/05_daily_spin.png',
      '/screenshots/ludo/06_player_profile.png',
      '/screenshots/ludo/07_how_to_play.png',
    ],
    whatsNew: 'Synchronous token path collision system, 4-player pass-and-play matrix, and anti-tamper dice rng seeds.',
    playConsoleUrl: 'https://play.google.com/apps/testing/ludo.binge',
    icon: 'dice',
    bannerType: 'ludo',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=ludo.binge',
    playStoreStatus: 'Closed Testing Track',
    appStoreUrl: '',
    appStoreStatus: 'Coming Soon',
    privacyUrl: '/apps/games/ludo-binge/privacy-policy',
    technologies: [
      'React Native',
      'Expo SDK',
      'TypeScript',
      'Expo FileSystem',
      'Expo Haptics',
      'Synthesized Audio Engine',
      'Google Mobile Ads',
    ],
    highlights: [
      'Solo Game vs Computer AI (Relaxed & Tactical AI difficulty options)',
      'Pass & Play Local Multiplayer for 2, 3, or 4 Players on 1 Phone',
      '8 Luxury Arena Themes (Midnight Garden, Velvet Room, Eclipse Suite & more)',
      '10 Custom Dice Styles & 7 Sculpted Pawn Collections',
      'Daily Fortune Spin Wheel for LD Coins, streak multipliers & rewards',
      '100% Offline-First with Auto-Pause & ludo-binge-offline-v2 persistence',
      'Online Battles Roadmap: Global matchmaking marked as Coming Soon',
    ],
    features: [
      { label: 'Game Modes', value: 'Solo vs AI & Pass & Play (2–4P)' },
      { label: 'AI Difficulty', value: 'Relaxed & Tactical Heuristics' },
      { label: 'Board Cosmetics', value: '8 Luxury Arena Themes' },
      { label: 'Pawn Collections', value: '7 Sculpted Pawn Sets' },
      { label: 'Dice Styles', value: '10 Custom Dice Varieties' },
      { label: 'Economy & Rewards', value: 'Daily Spin & Earned LD Coins' },
      { label: 'Save Format', value: 'ludo-binge-offline-v2' },
      { label: 'Play Store Status', value: 'Closed Testing Track (v1.0.0)' },
    ],
    featured: true,
    order: 2,
    containsAds: true,
  },
];
