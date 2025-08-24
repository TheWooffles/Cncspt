export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  folder: string;
  featured: boolean;

  // ✅ Legacy support (optional):
  instructions?: string;

  // ✅ New structured fields:
  players?: "Single" | "Two" | "Single & Two";
  controls?: {
    singlePlayer?: string[];
    twoPlayer?: string[];
  };
  tips?: string[];
}

export interface GameCollection {
  games: Game[];
}
