import { Game } from "@/types/game";

export const gamesData: Game[] = [
  {
    id: "1",
    title: "Basket Random",
    description:
      "Basket Random is a chaotic 2-player arcade sports game with unpredictable physics. Bounce and battle for the ball across wild courts, with each dunk launching you to the next level!",
    thumbnail: "/games/basket-random/splash.jpeg",
    tags: ["Basketball", "2-Player", "Physics", "Arcade"],
    folder: "basket-random",
    featured: true,
    players: "Single & Two",
    developer: "RHM Interactive",
    controls: {
      singlePlayer: ["Move & Jump: Arrow Keys"],
      twoPlayer: ["P1: Jump with W", "P2: Jump with Up Arrow"],
    },
    tips: ["Time your jumps carefully.", "Adapt to random changes each round."],
  },
  {
    id: "2",
    title: "Basketball Stars",
    description:
      "Step onto the court in Basketball Stars! Show off your skills with powerful dunks, quick steals, and smooth dribbles. Play 1v1 against AI or challenge a friend in intense basketball matches.",
    thumbnail: "/games/basketball-stars/assets/images/basketball-stars.png",
    tags: ["Basketball", "Sports", "1v1", "2-Player"],
    folder: "basketball-stars",
    featured: true,
    players: "Single & Two",
    developer: "Madpuffers",
    controls: {
      singlePlayer: [
        "Move: Arrow Keys",
        "Shoot/Dunk: X",
        "Steal/Block: Z",
        "Dash: Double-tap Arrow Key",
      ],
      twoPlayer: [
        "P1: Move A/D | Shoot W | Steal S",
        "P2: Move Arrows | Shoot Up Arrow | Steal Down Arrow",
      ],
    },
    tips: [
      "Steal when the opponent dribbles too close.",
      "Dash for quick breaks.",
      "Fake moves to outsmart your opponent.",
    ],
  },
  {
    id: "3",
    title: "Monkey Mart",
    description:
      "Monkey Mart is a fun and addictive supermarket simulation game where you run your own store! Stock products, serve customers, and expand your business as you earn coins and unlock new features.",
    thumbnail: "/games/MonkeyMart/bg_loading.png",
    tags: ["Store", "Building", "Simulator", "Idle"],
    folder: "MonkeyMart",
    featured: true,
    players: "Single",
    developer: "Tiny Dobbins",
    controls: {
      singlePlayer: [
        "Move your monkey to plant crops and stock shelves.",
        "Collect coins from customers.",
        "Upgrade and expand your store.",
      ],
    },
    tips: [
      "Keep shelves stocked to maximize profits.",
      "Upgrade early for faster progress.",
    ],
  },
  {
    id: "4",
    title: "Motox3m",
    description:
      "Motox3m is an adrenaline-pumping bike racing game filled with insane stunts and dangerous obstacles. Race through challenging levels and perform tricks to earn the best time!",
    thumbnail: "/games/motox3m/splash.jpg",
    tags: ["Racing", "Stunts", "Obby", "Bike"],
    folder: "motox3m",
    featured: false,
    players: "Single",
    developer: "Madpuffers",
    controls: {
      singlePlayer: [
        "Accelerate: Up Arrow",
        "Brake: Down Arrow",
        "Lean Left: Left Arrow",
        "Lean Right: Right Arrow",
      ],
    },
    tips: [
      "Balance your bike to avoid crashes.",
      "Time your flips for style points.",
    ],
  },
  {
    id: "5",
    title: "2048",
    description:
      "2048 is a popular sliding puzzle game where you combine tiles with the same numbers to reach the 2048 tile. Use logic and planning to achieve the highest score possible.",
    thumbnail: "/games/2048/2048.png",
    tags: ["Puzzle", "Strategy", "Logic", "Single-Player"],
    folder: "2048",
    featured: false,
    players: "Single",
    developer: "Gabriele Cirulli",
    controls: {
      singlePlayer: [
        "Use Arrow Keys to slide tiles.",
        "Combine matching numbers to create larger tiles.",
      ],
    },
    tips: [
      "Plan moves ahead to avoid blocking yourself.",
      "Keep high-value tiles in one corner.",
    ],
  },
  {
    id: "6",
    title: "Retro Bowl",
    description:
      "Retro Bowl is a classic-style American football game where you manage your team, call plays, and score touchdowns. Become the ultimate football coach and player!",
    thumbnail: "/games/retro-bowl/img/icon.jpg",
    tags: ["Football", "Sports", "Strategy", "Management"],
    folder: "retro-bowl",
    featured: false,
    players: "Single",
    developer: "New Star Games",
    controls: {
      singlePlayer: [
        "Move: Arrow Keys",
        "Pass: Click or Tap",
        "Manage team in menu for upgrades.",
      ],
    },
    tips: [
      "Recruit top players for better performance.",
      "Balance offense and defense.",
    ],
  },
  {
    id: "7",
    title: "Awesome Tanks 2",
    description:
      "Awesome Tanks 2 is an action-packed tank battle game! Destroy enemies, upgrade your tank, and survive challenging missions to dominate the battlefield.",
    thumbnail: "/games/awesometanks2/awesometanks2.jpg",
    tags: ["Tanks", "Action", "Strategy", "Single-Player"],
    folder: "awesometanks2",
    featured: false,
    players: "Single",
    developer: "Coolmath Games",
    controls: {
      singlePlayer: [
        "Move: WASD or Arrow Keys",
        "Shoot: Left Mouse Click",
        "Switch Weapons: 1-3",
      ],
    },
    tips: [
      "Upgrade armor and firepower for tougher levels.",
      "Use cover to avoid enemy fire.",
    ],
  },
  {
    id: "8",
    title: "Rocket League",
    description:
      "Rocket League is a high-speed car soccer game where you control rocket-powered cars to score goals. Race, jump, and boost your way to victory in this unique sports experience.",
    thumbnail: "/games/Rocket-League/splash.png",
    tags: ["Cars", "Football", "Strategy", "Multiplayer"],
    folder: "rocket-league",
    featured: false,
    players: "Single & Two",
    developer: "Psyonix",
    controls: {
      singlePlayer: ["Move: WASD or Arrow Keys", "Boost: Shift", "Jump: Space"],
    },
    tips: [
      "Boost at the right time for speed advantage.",
      "Control your jumps for accurate shots.",
    ],
  },
  {
    id: "9",
    title: "Bloxors",
    description:
      "Bloxors is a challenging puzzle game where you roll a rectangular block to fit into a square hole. Solve tricky levels using logic and precision!",
    thumbnail: "/games/bloxors/block.png",
    tags: ["Puzzle", "Strategy", "Logic", "Single-Player"],
    folder: "bloxors",
    featured: false,
    players: "Single",
    developer: "Coolmath Games",
    controls: {
      singlePlayer: ["Move: Arrow Keys to roll the block."],
    },
    tips: [
      "Plan moves to avoid falling off the edge.",
      "Think ahead for narrow paths.",
    ],
  },
  {
    id: "10",
    title: "Drift Hunters",
    description:
      "Drift Hunters is an exciting car drifting game where you race, drift, and earn points to upgrade your vehicles. Master your drifting skills across various tracks and cars.",
    thumbnail: "/games/drift-hunters/media/drift-hunters.png",
    tags: ["Car", "Racing", "Drift", "Single-Player"],
    folder: "drift-hunters",
    featured: false,
    players: "Single",
    developer: "ilya kaminetsky",
    controls: {
      singlePlayer: [
        "Accelerate: W or Up Arrow",
        "Brake: S or Down Arrow",
        "Steer: A/D or Left/Right Arrows",
        "Handbrake: Space",
      ],
    },
    tips: [
      "Chain drifts for maximum points.",
      "Upgrade your car for better handling.",
    ],
  },
];
