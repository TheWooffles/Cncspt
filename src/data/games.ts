import { Game } from '@/types/game';

export const gamesData: Game[] = [
  {
    id: '1',
    title: 'Basket Random',
    description: 'Basketball Game',
    instructions: 'Plays',
    thumbnail: '/games/basket-random/splash.jpeg',
    tags: ['basketball', 'strategy', 'sports', 'random', '2-Player', '1v1'],
    folder: 'basket-random',
    featured: true,
  },
  {
    id: '2',
    title: 'Basketball Stars',
    description:
      'Step onto the court in Basketball Stars!\n\n' +
      '• Play intense 1v1 basketball matches\n' +
      '• Show off dribbling, shooting, and dunking skills\n' +
      '• Compete against AI or a friend in 2-player mode\n' +
      '• Master quick steals, powerful shots, and fast moves',
    instructions:
      'Single Player:\n' +
      '• Move: Arrow Keys\n' +
      '• Shoot/Dunk: X\n' +
      '• Steal/Block: Z\n' +
      '• Dash: Double-tap Arrow Key\n\n' +
      'Two Player:\n' +
      '• P1 — Move: A/D | Shoot: W | Steal: S\n' +
      '• P2 — Move: Arrow Keys | Shoot: Up Arrow | Steal: Down Arrow\n\n' +
      'Tips & Tricks:\n' +
      '• Time jumps to block shots\n' +
      '• Steal when the opponent dribbles too close\n' +
      '• Use fakes to create space for easy shots\n' +
      '• Dash to break free for dunks',
    thumbnail: '/games/basketball-stars/assets/images/basketball-stars.png',
    tags: ['basketball', 'sports', '1v1', '2-Player'],
    folder: 'basketball-stars',
    featured: true,
  },
  {
    id: '3',
    title: 'Monkey Mart',
    description: 'Building Your own Supermarket',
    instructions: 'Plays',
    thumbnail: '/games/MonkeyMart/bg_loading.png',
    tags: ['store', 'building', 'simulator', 'idle'],
    folder: 'MonkeyMart',
    featured: true,
  },
  {
    id: '4',
    title: 'Motox3m',
    description: 'Racing obby game',
    instructions: 'Plays',
    thumbnail: '/games/motox3m/splash.jpg',
    tags: ['obby', 'racing', 'car'],
    folder: 'motox3m',
    featured: false,
  },
  {
    id: '5',
    title: '2048',
    description: 'Number Puzzle Game',
    instructions: 'Plays',
    thumbnail: '/games/2048/2048.png',
    tags: ['puzzle', 'strategy'],
    folder: '2048',
    featured: false,
  },
  {
    id: '6',
    title: 'Bitlife',
    description: 'Life Simulator',
    instructions: 'Plays',
    thumbnail: '/games/bitlife/logo.png',
    tags: ['simulator', 'idle'],
    folder: 'bitlife',
    featured: false,
  },
  {
    id: '7',
    title: 'Retro Bowl',
    description: 'Football Simulator',
    instructions: 'Plays',
    thumbnail: '/games/retro-bowl/img/icon.jpg',
    tags: ['sports', 'football', 'strategy'],
    folder: 'retro-bowl',
    featured: false,
  },
  {
    id: '8',
    title: '1v1.lol',
    description: '1v1 other people',
    instructions: 'Plays',
    thumbnail: '/games/1v1lol/splash.png',
    tags: ['building', 'fighting', '1v1', 'multiplayer'],
    folder: '1v1lol',
    featured: false,
  },
];