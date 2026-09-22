export interface AppItem {
  _id: string;
  id?: string;
  title: string;
  subtitle?: string;
  tagline: string;
  category: 'Games' | 'Productivity' | 'Utilities' | 'Tools' | string;
  package: string;
  version?: string;
  status?: string; // 'Production' | 'Closed Testing' | 'Early Access'
  rating?: string;
  ratingCount?: string;
  icon?: string;
  bannerType?: string;
  playStoreUrl?: string;
  privacyUrl?: string;
  technologies?: string[];
  highlights?: string[];
  features?: Array<{ label: string; value: string }>;
  featured?: boolean;
  order?: number;
}

export const defaultApps: AppItem[] = [
  {
    _id: 'app-chess-binge',
    id: 'chess-binge',
    title: 'Chess Binge',
    subtitle: 'Grandmaster AI & Tactical Analysis',
    tagline: 'Competitive chess engineered with multi-depth move evaluations, customizable piece cosmetics, tactile haptics, and instant game state recovery.',
    category: 'Games',
    package: 'chess.binge',
    version: 'v2.0.2',
    status: 'Production',
    rating: '4.9',
    ratingCount: '500+ Players',
    icon: '♟️',
    bannerType: 'chess',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=chess.binge',
    privacyUrl: '/privacy-policy/chess-binge',
    technologies: [
      'React Native',
      'Expo SDK 57',
      'Stockfish AI',
      'TypeScript',
      'Android AAB',
      'Google AdMob',
    ],
    highlights: [
      'Multi-Depth Position Analysis (Instant blunder & best-move evaluations)',
      'Haptic Piece Snapping with strict FIDE move-validation algorithms',
      'Local-First Offline Play with robust FEN board string recovery',
      'Custom Board & Piece Themes with Binge Coins progression',
      'Guaranteed Google AdMob Compliance with optional rewarded hint videos',
    ],
    features: [
      { label: 'Platform', value: 'Android 8.0+ (API 26+)' },
      { label: 'Bundle Format', value: 'Signed Android AAB' },
      { label: 'Engine AI', value: 'Multi-Depth Evaluation' },
      { label: 'Monetization', value: 'AdMob Interstitial & Rewarded' },
    ],
    featured: true,
    order: 1,
  },
  {
    _id: 'app-ludo-binge',
    id: 'ludo-binge',
    title: 'Ludo Binge',
    subtitle: 'Real-Time Multiplayer & Bot Arena',
    tagline: 'High-speed classic board game built with 60 FPS native board loops, custom dice physics, dynamic audio synthesizers, and adaptive AI bots.',
    category: 'Games',
    package: 'ludo.binge',
    version: 'v1.0.0',
    status: 'Closed Testing',
    rating: 'Coming Soon',
    ratingCount: 'Closed Testing',
    icon: '🎲',
    bannerType: 'ludo',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=ludo.binge',
    privacyUrl: '/privacy-policy/ludo-binge',
    technologies: [
      'React Native',
      'Expo SDK 57',
      'WebSockets',
      'Audio Engine',
      'TypeScript',
      'Google AdMob',
    ],
    highlights: [
      '60 FPS Native Board Loop with smooth pawn translation physics',
      'Real-Time WebSocket Multiplayer matchmaking engine',
      'Zero-Latency Offline AI Bots with adaptive tactical aggression',
      'Dynamic Audio Synthesizers & tactile haptic dice roll feedback',
      'Sandboxed Local Storage with zero account signup friction',
    ],
    features: [
      { label: 'Platform', value: 'Android 8.0+ (API 26+)' },
      { label: 'Bundle Format', value: 'Signed Android AAB' },
      { label: 'Multiplayer', value: 'WebSockets + Pass & Play' },
      { label: 'Audio', value: 'Custom Native Synthesizer' },
    ],
    featured: true,
    order: 2,
  },
  {
    _id: 'app-flow-task',
    id: 'flow-task',
    title: 'FlowTask Pro',
    subtitle: 'Focus, Productivity & Habit Engine',
    tagline: 'Minimalist offline-first task tracker and Pomodoro timer engineered with biometric app lock, widget sync, and automated calendar bridging.',
    category: 'Productivity',
    package: 'com.shivam.flowtask',
    version: 'v1.2.0',
    status: 'Early Access',
    rating: '4.8',
    ratingCount: 'Early Access',
    icon: '⚡',
    bannerType: 'flow',
    playStoreUrl: '',
    privacyUrl: '/privacy-policy/flowtask',
    technologies: [
      'React Native',
      'Expo SQLite',
      'Local Notifications',
      'Biometric Auth',
      'TypeScript',
    ],
    highlights: [
      'Encrypted local SQLite database with zero cloud telemetry',
      'Custom Pomodoro intervals with white noise soundscapes',
      'Biometric fingerprint and FaceID protection',
      'Exportable markdown summaries and backup archives',
    ],
    features: [
      { label: 'Platform', value: 'Android 9.0+' },
      { label: 'Storage', value: 'Encrypted SQLite' },
      { label: 'Security', value: 'Biometric Keystore' },
      { label: 'Network', value: '100% Offline-First' },
    ],
    featured: true,
    order: 3,
  },
  {
    _id: 'app-dev-lens',
    id: 'dev-lens',
    title: 'DevLens Toolkit',
    subtitle: 'Network Inspector & API Debugger',
    tagline: 'Android developer companion for inspecting live HTTP/WebSocket headers, JSON payload formatting, and cryptographic hash verification on device.',
    category: 'Utilities',
    package: 'com.shivam.devlens',
    version: 'v1.1.4',
    status: 'Closed Testing',
    rating: '5.0',
    ratingCount: 'Internal Alpha',
    icon: '🛠️',
    bannerType: 'tools',
    playStoreUrl: '',
    privacyUrl: '/privacy-policy/devlens',
    technologies: [
      'React Native',
      'Android Native Interceptors',
      'JSON Visualizer',
      'CryptoJS',
      'TypeScript',
    ],
    highlights: [
      'Instant cURL command generation and proxy routing',
      'Syntax-highlighted collapsible JSON tree inspector',
      'SHA256, MD5, and Base64 cryptographic encoder tools',
      'Floating overlay bubble for seamless debugging across target apps',
    ],
    features: [
      { label: 'Platform', value: 'Android 10.0+' },
      { label: 'Debugger', value: 'Proxy & LogCat Bridge' },
      { label: 'Inspection', value: 'HTTP / WS Stream' },
      { label: 'Permissions', value: 'Zero Root Required' },
    ],
    featured: false,
    order: 4,
  },
];
