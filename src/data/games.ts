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
    description: 'Step onto the court in <strong>Basketball Stars!</strong><br><br>\
  <ul>\
  <li>Play intense 1v1 basketball matches</li>\
  <li>Show off dribbling, shooting, and dunking skills</li>\
  <li>Compete against AI or a friend in 2-player mode</li>\
  <li>Master quick steals, powerful shots, and fast moves</li>\
  </ul>',
    instructions: '<strong>Single Player:</strong><br>\
  <ul>\
  <li>Move: Arrow Keys</li>\
  <li>Shoot/Dunk: X</li>\
  <li>Steal/Block: Z</li>\
  <li>Dash: Double-tap Arrow Key</li>\
  </ul>\
  <strong>Two Player:</strong><br>\
  <ul>\
  <li>Player 1: Move: A/D | Shoot: W | Steal: S</li>\
  <li>Player 2: Move: Arrow Keys | Shoot: Up Arrow | Steal: Down Arrow</li>\
  </ul>\
  <strong>Tips & Tricks:</strong><br>\
  <ul>\
  <li>Time your jumps to block shots</li>\
  <li>Use quick steals when your opponent dribbles too close</li>\
  <li>Fake out your opponent for easy shots</li>\
  <li>Master the dash move to break free for a dunk</li>\
  </ul>',
    thumbnail: '/games/basketball-stars/assets/images/basketball-stars.png',
    tags: ['basketball', 'sports', 'action', '2-Player'],
    folder: 'basketball-stars',
    featured: true,
  },
];