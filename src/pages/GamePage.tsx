import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Maximize, Minimize, ArrowUpSquare } from "lucide-react";
import { gamesData } from "@/data/games";
import { useState, useEffect } from "react";
import { GameLoader } from "@/components/GameLoader";

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControlsPopup, setShowControlsPopup] = useState(false);

  const game = gamesData.find((g) => g.id === id);

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

  const relatedGames = gamesData.filter(
    (g) =>
      g.id !== game.id &&
      (g.tags.some((tag) => game.tags.includes(tag)) ||
        g.title.toLowerCase().includes(game.title.toLowerCase()))
  );

  const otherGames = gamesData
    .filter(
      (g) => g.id !== game.id && !relatedGames.some((rel) => rel.id === g.id)
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <div
      className={`min-h-screen bg-gradient-hero ${
        isFullscreen ? "overflow-hidden" : ""
      }`}
    >
      <header className="bg-background-glass backdrop-blur-glass border-b border-glass-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-foreground hover:bg-glass-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>

          {/* Fullscreen + Controls buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => setShowControlsPopup(!showControlsPopup)}
              variant="outline"
              className="flex items-center gap-1 text-foreground"
            >
              <ArrowUpSquare className="w-5 h-5" />
              Controls
            </Button>

            <Button
              onClick={() =>
                isFullscreen
                  ? document.exitFullscreen()
                  : document.documentElement.requestFullscreen()
              }
              variant="outline"
              className="flex items-center gap-1 text-foreground"
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5" />
              ) : (
                <Maximize className="w-5 h-5" />
              )}
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 relative">
        {/* Controls Popup */}
        {showControlsPopup && game.controls && (
          <div className="absolute top-16 right-4 w-80 bg-gray-900 bg-opacity-95 p-4 rounded-lg border border-gray-700 shadow-lg z-50">
            <h3 className="text-lg font-semibold text-white mb-2">Controls</h3>
            {game.controls.singlePlayer && (
              <div className="mb-3">
                <h4 className="font-medium text-white mb-1">Single Player:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {game.controls.singlePlayer.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            {game.controls.twoPlayer && (
              <div>
                <h4 className="font-medium text-white mb-1">Two Player:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {game.controls.twoPlayer.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            <Button
              onClick={() => setShowControlsPopup(false)}
              variant="ghost"
              className="mt-3 w-full"
            >
              Close
            </Button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Game + Details */}
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

                  {/* Tags */}
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

          {/* Sidebar Sections */}
          <div className="space-y-10">
            {/* Related Games */}
            {relatedGames.length > 0 && (
              <section>
                <h4 className="text-foreground text-xl font-semibold mb-4">
                  Related Games
                </h4>
                <div className="grid gap-4">
                  {relatedGames.map((related) => (
                    <Card
                      key={related.id}
                      className="bg-gradient-card backdrop-blur-glass border-glass-border p-3 cursor-pointer hover:shadow-glow hover:border-primary transition-all duration-300"
                      onClick={() => navigate(`/game/${related.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={related.thumbnail}
                          alt={related.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h5 className="text-foreground font-semibold">
                            {related.title}
                          </h5>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {related.tags.slice(0, 2).map((tag) => (
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
              </section>
            )}

            {/* Other Games */}
            {otherGames.length > 0 && (
              <section>
                <h4 className="text-foreground text-xl font-semibold mb-4">
                  Other Games
                </h4>
                <div className="grid gap-4">
                  {otherGames.map((other) => (
                    <Card
                      key={other.id}
                      className="bg-gradient-card backdrop-blur-glass border-glass-border p-3 cursor-pointer hover:shadow-glow hover:border-primary transition-all duration-300"
                      onClick={() => navigate(`/game/${other.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={other.thumbnail}
                          alt={other.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h5 className="text-foreground font-semibold">
                            {other.title}
                          </h5>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {other.tags.slice(0, 2).map((tag) => (
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
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
