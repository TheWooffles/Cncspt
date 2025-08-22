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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-foreground hover:bg-glass-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game Section */}
        <div className="lg:col-span-2">
          <Card
            className="relative bg-gradient-card backdrop-blur-glass border-glass-border shadow-glass animate-fade-in overflow-hidden"
            id="game-container"
          >
            <CardContent className="p-0">
              <GameLoader
                game={game}
                isFullscreen={isFullscreen}
                onExitFullscreen={() => setIsFullscreen(false)}
                onEnterFullscreen={() => setIsFullscreen(true)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Related Games */}
        <div>
          <Card className="bg-gradient-card backdrop-blur-glass border-glass-border shadow-glass">
            <CardHeader>
              <CardTitle className="text-foreground text-xl font-bold">Related Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                      className="flex items-center gap-3 cursor-pointer hover:bg-glass-primary p-2 rounded-lg transition"
                      onClick={() => navigate(`/game/${related.id}`)}
                    >
                      <img
                        src={related.thumbnail}
                        alt={related.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-foreground font-semibold">{related.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {related.tags.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Game Info Section */}
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-gradient-card backdrop-blur-glass border-glass-border shadow-glass">
          <CardHeader>
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
  );
};

export default GamePage;
