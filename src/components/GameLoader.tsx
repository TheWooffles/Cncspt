import { useState, useEffect, useRef } from 'react';
import { Loader2, AlertCircle, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Game } from '@/types/game';

interface GameLoaderProps {
  game: Game;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const GameLoader = ({ game, isFullscreen, onToggleFullscreen }: GameLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isUnityGame = game.tags.includes('Unity') || game.folder.includes('unity');

  // Simulate loading progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const progressTimer = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadProgress(100);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  /** ✅ Fullscreen handling **/
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = document.fullscreenElement === containerRef.current;
      if (isNowFullscreen !== isFullscreen) {
        onToggleFullscreen(); // Sync React state with actual DOM fullscreen state
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen, onToggleFullscreen]);

  /** ✅ ESC key exit fullscreen **/
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen().catch((err) =>
          console.error('Failed to exit fullscreen:', err)
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const enterFullscreen = async () => {
    if (containerRef.current && !document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (error) {
        console.error('Failed to enter fullscreen:', error);
      }
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error('Failed to exit fullscreen:', error);
      }
    }
  };

  /** ✅ Error State **/
  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] bg-gradient-card backdrop-blur-glass border-glass-border rounded-lg">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">Failed to Load Game</h3>
          <p className="text-muted-foreground">
            The game could not be loaded. Please try again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="bg-background-glass border-glass-border hover:bg-glass-primary"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  /** ✅ Fullscreen Layout **/
  if (isFullscreen) {
    return (
      <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex flex-col">
        {/* Exit Fullscreen Button */}
        <div className="absolute top-2 left-2 z-50">
          <Button
            onClick={exitFullscreen}
            variant="outline"
            size="sm"
            className="bg-background-glass/90 backdrop-blur-glass border-glass-border hover:bg-glass-primary shadow-lg"
          >
            <Minimize className="w-3 h-3 mr-1" />
            <span className="text-xs">Exit</span>
          </Button>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-glass flex flex-col items-center justify-center z-40">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  {isUnityGame ? 'Loading Unity Game...' : 'Loading Game...'}
                </h3>
                <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary transition-all duration-300 ease-out"
                    style={{ width: `${Math.min(loadProgress, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-white/70">{Math.round(Math.min(loadProgress, 100))}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Game iframe */}
        <iframe
          ref={iframeRef}
          src={`/games/${game.folder}/index.html`}
          className="w-full h-full border-0 flex-1"
          title={game.title}
          allowFullScreen
          allow="gamepad; microphone; camera"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ background: isUnityGame ? '#000' : 'transparent' }}
        />
      </div>
    );
  }

  /** ✅ Normal View **/
  return (
    <div className="space-y-4">
      {/* Fullscreen Button */}
      <div className="flex justify-end">
        <Button
          onClick={enterFullscreen}
          variant="outline"
          size="sm"
          className="bg-background-glass border-glass-border hover:bg-glass-primary transition-all duration-200 hover:scale-105"
          disabled={isLoading}
        >
          <Maximize className="w-4 h-4 mr-2" />
          Fullscreen
        </Button>
      </div>

      {/* Game Container */}
      <div
        ref={containerRef}
        className="relative aspect-video rounded-lg overflow-hidden bg-gradient-card backdrop-blur-glass border-glass-border"
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-card backdrop-blur-glass flex flex-col items-center justify-center z-10">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {isUnityGame ? 'Loading Unity Game...' : 'Loading Game...'}
                </h3>
                <div className="w-64 h-2 bg-background-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary transition-all duration-300 ease-out"
                    style={{ width: `${Math.min(loadProgress, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{Math.round(Math.min(loadProgress, 100))}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Game iframe */}
        <iframe
          ref={iframeRef}
          src={`/games/${game.folder}/index.html`}
          className="w-full h-full border-0"
          title={game.title}
          allowFullScreen
          allow="gamepad; microphone; camera"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ background: isUnityGame ? '#000' : 'transparent' }}
        />
      </div>
    </div>
  );
};
