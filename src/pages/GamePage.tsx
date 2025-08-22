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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Info */}
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

          {/* Game Container */}
          <div className="lg:col-span-2">
            <Card className="group bg-gradient-card backdrop-blur-glass border-glass-border animate-fade-in shadow-glass hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4">
                <GameLoader 
                  game={game}
                  isFullscreen={isFullscreen}
                  onToggleFullscreen={toggleFullscreen}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;