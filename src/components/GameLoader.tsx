import { useState, useEffect, useRef } from 'react';
import { Loader2, AlertCircle, Minimize } from 'lucide-react';
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
  const [pseudoFS, setPseudoFS] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isUnityGame = game.tags.includes('Unity') || game.folder.includes('unity');

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
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

  const getFullscreenElement = () =>
    document.fullscreenElement ||
    // @ts-ignore
    document.webkitFullscreenElement ||
    // @ts-ignore
    document.mozFullScreenElement ||
    // @ts-ignore
    document.msFullscreenElement;

  const exitDocFullscreen = async () => {
    try {
      if (document.exitFullscreen) return await document.exitFullscreen();
      // @ts-ignore
      if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
      // @ts-ignore
      if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
      // @ts-ignore
      if (document.msExitFullscreen) return document.msExitFullscreen();
    } catch {}
  };

  useEffect(() => {
    const sync = () => {
      const active = getFullscreenElement() === containerRef.current;
      if (active !== isFullscreen) onToggleFullscreen();
      if (!active) setPseudoFS(false);
    };

    const evts = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'] as const;
    evts.forEach(evt => document.addEventListener(evt, sync));
    return () => {
      evts.forEach(evt => document.removeEventListener(evt, sync));
    };
  }, [isFullscreen, onToggleFullscreen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (getFullscreenElement()) exitDocFullscreen().catch(() => {});
      else if (pseudoFS) {
        setPseudoFS(false);
        if (isFullscreen) onToggleFullscreen();
        document.documentElement.style.removeProperty('overflow');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pseudoFS, isFullscreen, onToggleFullscreen]);

  return hasError ? (
    <div className="flex items-center justify-center h-full min-h-[400px] bg-gradient-card backdrop-blur-glass border-glass-border rounded-lg">
      <div className="text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
        <h3 className="text-lg font-semibold text-foreground">Failed to Load Game</h3>
        <p className="text-muted-foreground">The game could not be loaded. Please try again later.</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="bg-background-glass border-glass-border hover:bg-glass-primary"
        >
          Retry
        </Button>
      </div>
    </div>
  ) : (
    <div className="space-y-4">
      {/* Only exit fullscreen button inside the container */}
      {(isFullscreen || pseudoFS) && (
        <div className="absolute top-2 left-2 z-50">
          <Button
            onClick={async () => {
              if (getFullscreenElement()) await exitDocFullscreen();
              else if (pseudoFS) {
                setPseudoFS(false);
                document.documentElement.style.removeProperty('overflow');
                if (isFullscreen) onToggleFullscreen();
              }
            }}
            variant="outline"
            size="sm"
            className="bg-background-glass/90 backdrop-blur-glass border-glass-border hover:bg-glass-primary shadow-lg"
          >
            <Minimize className="w-3 h-3 mr-1" />
            <span className="text-xs">Exit</span>
          </Button>
        </div>
      )}

      <div
        ref={containerRef}
        className={[
          'relative rounded-lg overflow-hidden bg-gradient-card backdrop-blur-glass border-glass-border',
          !(isFullscreen || pseudoFS) ? 'aspect-video' : '',
          pseudoFS ? 'fixed inset-0 z-50 bg-black' : '',
        ].join(' ')}
        tabIndex={-1}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-card/90 backdrop-blur-glass flex flex-col items-center justify-center z-40">
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

        <iframe
          ref={iframeRef}
          src={`/games/${game.folder}/index.html`}
          className="w-full h-full border-0"
          title={game.title}
          allowFullScreen
          allow="fullscreen *; gamepad; autoplay; microphone; camera"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ background: isUnityGame ? '#000' : 'transparent' }}
        />
      </div>
    </div>
  );
};
