import { Game } from '@/types/game';

export const gamesData: Game[] = [
  {
    id: '1',
    title: 'Space Explorer',
    description: 'Navigate through the cosmos and discover new planets in this exciting space adventure.',
    instructions: 'Use WASD or arrow keys to move your spaceship. Collect power-ups and avoid asteroids. Reach the portal to complete each level.',
    thumbnail: '/games/space-explorer/thumbnail.png',
    tags: ['action', 'adventure', 'space', 'Unity'],
    folder: 'space-explorer',
    featured: true,
  },
  {
    id: '2',
    title: 'Puzzle Master',
    description: 'Challenge your mind with increasingly complex puzzles that test your logical thinking.',
    instructions: 'Click and drag pieces to solve the puzzle. Use hints if you get stuck. Complete all levels to become the Puzzle Master.',
    thumbnail: '/games/puzzle-master/thumbnail.png',
    tags: ['puzzle', 'strategy', 'brain'],
    folder: 'puzzle-master',
    featured: false,
  },
  {
    id: '3',
    title: 'Racing Thunder',
    description: 'High-speed racing action with multiple tracks and customizable vehicles.',
    instructions: 'Use arrow keys to steer and accelerate. Collect boost items and avoid obstacles. Finish first to unlock new tracks.',
    thumbnail: '/games/racing-thunder/thumbnail.png',
    tags: ['racing', 'action', 'speed'],
    folder: 'racing-thunder',
    featured: true,
  },
  {
    id: '4',
    title: 'Basket Random',
    description: 'Basketball Game',
    instructions: 'Plays',
    thumbnail: '/games/Basket/splash.jpeg',
    tags: ['strategy', 'action', 'speed'],
    folder: 'Basket',
    featured: true,
  },
];