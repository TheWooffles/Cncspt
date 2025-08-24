export interface Game {
  id: string;
  title: string;
  description: string;
  instructions?: string; // Still optional for legacy support
  thumbnail: string;
  tags: string[];
  folder: string;
  featured: boolean;

  // ✅ New structured fields:
  controls?: {
    singlePlayer?: string[];
    twoPlayer?: string[];
  };
  tips?: string[];
  players?: "Single" | "Two" | "Single & Two";
}

export interface GameCollection {
  games: Game[];
}
