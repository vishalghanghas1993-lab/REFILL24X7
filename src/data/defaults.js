export const THEME_PRESETS = ['#dc2626', '#7c3aed', '#0ea5e9', '#16a34a', '#f59e0b'];

export const FONT_OPTIONS = ['orbitron', 'rajdhani', 'inter'];

export const defaultGames = [
  {
    id: crypto.randomUUID(),
    title: 'Valorant',
    description: 'Precision tactical shooter with hero abilities.',
    coverUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-man-playing-videogame-1560/1080p.mp4',
    favorite: true,
    category: 'FPS',
  },
  {
    id: crypto.randomUUID(),
    title: 'Rocket League',
    description: 'High-speed car football with freestyle mechanics.',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-neon-hallway-1579/1080p.mp4',
    favorite: true,
    category: 'Sports',
  },
  {
    id: crypto.randomUUID(),
    title: 'Apex Legends',
    description: 'Battle royale squad combat with legend abilities.',
    coverUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-gamer-man-using-computer-8093/1080p.mp4',
    favorite: false,
    category: 'Battle Royale',
  },
];

export const defaultApps = [
  {
    id: crypto.randomUUID(),
    title: 'Discord',
    description: 'Squad voice and text communications.',
    coverUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-1576/1080p.mp4',
    favorite: true,
    category: 'Communication',
  },
  {
    id: crypto.randomUUID(),
    title: 'OBS Studio',
    description: 'Stream capture and scene management.',
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-motherboard-close-up-1576/1080p.mp4',
    favorite: false,
    category: 'Streaming',
  },
];

export const defaultNotifications = [
  { id: crypto.randomUUID(), message: 'Welcome to CROOZ-IN Launcher.', read: false, createdAt: Date.now() },
  { id: crypto.randomUUID(), message: 'Tip: Mark launchers as favorites for Home quick-access.', read: false, createdAt: Date.now() - 80000 },
];

export const achievementCatalog = [
  { id: 'first-launch', title: 'Ignition', requirement: 'Launch your first title.' },
  { id: '100-hours', title: 'Arena Regular', requirement: 'Reach 100 total hours.' },
  { id: '500-hours', title: 'Arena Legend', requirement: 'Reach 500 total hours.' },
  { id: 'favorites-10', title: 'Collector', requirement: 'Mark 10 favorites.' },
  { id: 'level-5', title: 'Rising Pro', requirement: 'Reach Level 5.' },
  { id: 'level-10', title: 'Elite Commander', requirement: 'Reach Level 10.' },
];
