import { Game } from '@/types/game';

export const gamesData: Game[] = [
  // {
  //   id: '1',
  //   title: 'Space Explorer',
  //   description: 'Navigate through the cosmos and discover new planets in this exciting space adventure.',
  //   instructions: 'Use WASD or arrow keys to move your spaceship. Collect power-ups and avoid asteroids. Reach the portal to complete each level.',
  //   thumbnail: '/games/space-explorer/thumbnail.png',
  //   tags: ['action', 'adventure', 'space', 'Unity'],
  //   folder: 'space-explorer',
  //   featured: true,
  // },
  // {
  //   id: '2',
  //   title: 'Puzzle Master',
  //   description: 'Challenge your mind with increasingly complex puzzles that test your logical thinking.',
  //   instructions: 'Click and drag pieces to solve the puzzle. Use hints if you get stuck. Complete all levels to become the Puzzle Master.',
  //   thumbnail: '/games/puzzle-master/thumbnail.png',
  //   tags: ['puzzle', 'strategy', 'brain'],
  //   folder: 'puzzle-master',
  //   featured: false,
  // },
  // {
  //   id: '3',
  //   title: 'Racing Thunder',
  //   description: 'High-speed racing action with multiple tracks and customizable vehicles.',
  //   instructions: 'Use arrow keys to steer and accelerate. Collect boost items and avoid obstacles. Finish first to unlock new tracks.',
  //   thumbnail: '/games/racing-thunder/thumbnail.png',
  //   tags: ['racing', 'action', 'speed'],
  //   folder: 'racing-thunder',
  //   featured: true,
  // },
  {
    id: '1',
    title: 'Basket Random',
    description: 'Basketball Game',
    instructions: 'Plays',
    thumbnail: '/games/Basket/splash.jpeg',
    tags: ['basketball', 'strategy', 'fun', 'random', '2-Player'],
    folder: 'Basket',
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
    tags: ['basketball', 'sports', 'action', '2-Player'],
    folder: 'basketball-stars',
    featured: true,
  }
];