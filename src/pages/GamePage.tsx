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

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  // Related games: match by title or tags, excluding current game
  const relatedGames = gamesData.filter(
    (g) =>
      g.id !== game.id &&
      (g.title.toLowerCase().includes(game.title.toLowerCase()) ||
        g.tags.some((tag) => game.tags.includes(tag)))
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background-glass backdrop-blur-glass border-b border-glass-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Top Row: Game + Related */}
        <div className="grid grid-cols-12 gap-8">
          {/* Game Container */}
          <div className="col-span-12 lg:col-span-8 px-2 lg:px-0">
            <Card className="group bg-gradient-card backdrop-blur-glass border-glass-border animate-fade-in shadow-glass hover:shadow-glow transition-all duration-300 h-full">
              <CardContent className="p-4 flex flex-col h-full">
                <GameLoader
                  game={game}
                  isFullscreen={isFullscreen}
                  onToggleFullscreen={toggleFullscreen}
                />
              </CardContent>
            </Card>
          </div>

          {/* Related Games */}
          <div className="col-span-12 lg:col-span-4 px-2 lg:px-0">
            <h4 className="text-foreground text-xl font-semibold mb-4">Related Games</h4>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {relatedGames.map((related) => (
                <Card
                  key={related.id}
                  className="bg-gradient-card backdrop-blur-glass border-glass-border p-3 cursor-pointer hover:shadow-glow transition-all"
                  onClick={() => navigate(`/game/${related.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={related.thumbnail}
                      alt={related.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h5 className="text-foreground font-semibold">{related.title}</h5>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {related.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-glass-border bg-glass-secondary/50 px-2 py-0.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Game Info */}
        <div className="col-span-12">
          <Card className="bg-gradient-card backdrop-blur-glass border-glass-border animate-fade-in shadow-glass">
            <CardHeader className="pb-4">
              <CardTitle className="text-foreground text-2xl font-bold">{game.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-h-[50vh] overflow-y-auto">
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{game.description}</p>

              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-lg">Instructions:</h4>
                <p className="text-sm text-muted-foreground leading-relaxed bg-glass-secondary/30 p-4 rounded-lg border border-glass-border whitespace-pre-line">
                  {game.instructions}
                </p>
              </div>

              {/* Tags */}
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
    </div>
  );
};

export default GamePage;
