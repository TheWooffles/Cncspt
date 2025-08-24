import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { gamesData } from "@/data/games";
import { useState, useEffect } from "react";
import { GameLoader } from "@/components/GameLoader";

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const game = gamesData.find((g) => g.id === id);

  // Exit fullscreen automatically if user presses ESC in native fullscreen
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [isFullscreen]);

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="bg-gradient-card backdrop-blur-glass border-glass-border p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Game Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The game you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/")} variant="default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </Card>
      </div>
    );
  }

  // Related games logic
  const relatedGames = gamesData.filter(
    (g) =>
      g.id !== game.id &&
      (g.tags.some((tag) => game.tags.includes(tag)) ||
        g.title.toLowerCase().includes(game.title.toLowerCase()))
  );

  // Other random games logic
  const otherGames = gamesData
    .filter(
      (g) => g.id !== game.id && !relatedGames.some((rel) => rel.id === g.id)
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 6); // Limit to 6 random games

  return (
    <div
      className={`min-h-screen bg-gradient-hero ${
        isFullscreen ? "overflow-hidden" : ""
      }`}
    >
      <header className="bg-background-glass backdrop-blur-glass border-b border-glass-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-2 flex items-center">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-foreground hover:bg-glass-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col">
            <Card className="relative bg-transparent shadow-none border-none">
              <CardContent className="p-0 relative">
                <GameLoader
                  game={game}
                  isFullscreen={isFullscreen}
                  onExitFullscreen={() => setIsFullscreen(false)}
                  onEnterFullscreen={() => setIsFullscreen(true)}
                />
              </CardContent>
            </Card>

            <div className="mt-4">
              <Card className="bg-gradient-card backdrop-blur-glass border-glass-border shadow-glass">
                <CardHeader className="pb-4">
                  <CardTitle className="text-foreground text-2xl font-bold">
                    {game.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {game.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-lg">
                      Instructions:
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-glass-secondary/30 p-4 rounded-lg border border-glass-border whitespace-pre-line">
                      {game.instructions}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-lg">
                      Tags:
                    </h4>
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

          <div>
            {/* Related Games */}
            {relatedGames.length > 0 && (
              <>
                <h4 className="text-foreground text-xl font-semibold mb-4">
                  Related Games
                </h4>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto scrollbar-hide">
                  {relatedGames.map((related) => (
                    <Card
                      key={related.id}
                      className="bg-gradient-card backdrop-blur-glass border-glass-border p-3 cursor-pointer hover:shadow-glow transition-all"
                      onClick={() => navigate(`/game/${related.id}`)}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={related.thumbnail}
                            alt={related.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <h5 className="text-foreground font-semibold">
                            {related.title}
                          </h5>
                        </div>
                        <div className="flex flex-wrap gap-1">
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
                    </Card>
                  ))}
                </div>
              </>
            )}

            {/* Other Games */}
            {otherGames.length > 0 && (
              <>
                <h4 className="text-foreground text-xl font-semibold mt-8 mb-4">
                  Other Games
                </h4>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto scrollbar-hide">
                  {otherGames.map((other) => (
                    <Card
                      key={other.id}
                      className="bg-gradient-card backdrop-blur-glass border-glass-border p-3 cursor-pointer hover:shadow-glow transition-all"
                      onClick={() => navigate(`/game/${other.id}`)}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={other.thumbnail}
                            alt={other.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <h5 className="text-foreground font-semibold">
                            {other.title}
                          </h5>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {other.tags.map((tag) => (
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
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
