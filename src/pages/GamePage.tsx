import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { gamesData } from '@/data/games';
import { useState } from 'react';
import { GameLoader } from '@/components/GameLoader';

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const game = gamesData.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="bg-gradient-card backdrop-blur-glass border-glass-border p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Game Not Found</h2>
          <p className="text-muted-foreground mb-6">The game you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} variant="default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background-glass backdrop-blur-glass border-b border-glass-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-foreground hover:bg-glass-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Container */}
          <div className="lg:col-span-2 flex flex-col">
            <Card className="relative bg-transparent shadow-none border-none" id="game-container">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                  <GameLoader
                    game={game}
                    isFullscreen={isFullscreen}
                    onExitFullscreen={() => setIsFullscreen(false)}
                    onEnterFullscreen={() => setIsFullscreen(true)}
                  />

                  {/* Bottom Info Bar */}
                  {!isFullscreen && (
                    <div className="absolute bottom-0 left-0 right-0 bg-background-glass backdrop-blur-glass border-t border-glass-border flex items-center justify-between px-4 py-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <h3 className="text-lg font-semibold text-foreground">{game.title}</h3>
                      </div>
                      <button
                        onClick={() => setIsFullscreen(true)}
                        className="p-2 rounded hover:bg-glass-primary transition-colors"
                        aria-label="Enter Fullscreen"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-18h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Game Info Section (same as before) */}
            <div className="mt-4">
              <Card className="bg-gradient-card backdrop-blur-glass border-glass-border animate-fade-in shadow-glass">
                <CardHeader className="pb-4">
                  <CardTitle className="text-foreground text-2xl font-bold">{game.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{game.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-lg">Instructions:</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-glass-secondary/30 p-4 rounded-lg border border-glass-border">
                      {game.instructions}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-lg">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-glass-border bg-glass-secondary/50 hover:bg-glass-primary transition-colors px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Games Section */}
          <div>
            <Card className="bg-gradient-card backdrop-blur-glass border-glass-border animate-fade-in shadow-glass">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Related Games</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {gamesData
                  .filter(
                    (g) =>
                      g.id !== game.id &&
                      (g.tags.some((tag) => game.tags.includes(tag)) ||
                        g.title.toLowerCase().includes(game.title.toLowerCase()))
                  )
                  .slice(0, 6)
                  .map((related) => (
                    <div
                      key={related.id}
                      className="flex items-center gap-3 p-2 rounded hover:bg-glass-primary cursor-pointer transition"
                      onClick={() => navigate(`/games/${related.id}`)}
                    >
                      <img
                        src={related.thumbnail}
                        alt={related.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span className="text-sm font-medium text-foreground">{related.title}</span>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
