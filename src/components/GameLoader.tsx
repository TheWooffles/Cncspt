import { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, AlertCircle, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Game } from '@/types/game';

interface GameLoaderProps {
  game: Game;
  isFullscreen: boolean;            // parent-owned UI state (we'll keep it in sync with actual FS)
  onToggleFullscreen: () => void;   // called when the REAL fullscreen state changes
}

export const GameLoader = ({ game, isFullscreen, onToggleFullscreen }: GameLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [pseudoFS, setPseudoFS] = useState(false); // fallback for iOS Safari (no Fullscreen API)

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isUnityGame = game.tags.includes('Unity') || game.folder.includes('unity');

  // --- Simulated loading (your original logic) ---
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

  // --- Fullscreen helpers (vendor-prefixed safe) ---
  const getFullscreenElement = () =>
    document.fullscreenElement ||
    // @ts-ignore
    document.webkitFullscreenElement ||
    // @ts-ignore
    document.mozFullScreenElement ||
    // @ts-ignore
    document.msFullscreenElement;

  const requestElementFullscreen = async (el: HTMLElement) => {
    try {
      if (el.requestFullscreen) return await el.requestFullscreen();
      // @ts-ignore
      if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
      // @ts-ignore
      if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
      // @ts-ignore
      if (el.msRequestFullscreen) return el.msRequestFullscreen();
      throw new Error('Fullscreen API not supported on this element.');
    } catch (e) {
      throw e;
    }
  };

  const exitDocFullscreen = async () => {
    try {
      if (document.exitFullscreen) return await document.exitFullscreen();
      // @ts-ignore
      if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
      // @ts-ignore
      if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
      // @ts-ignore
      if (document.msExitFullscreen) return document.msExitFullscreen();
    } catch (e) {
      throw e;
    }
  };

  // Keep parent state in sync with REAL fullscreen (or pseudo)
  useEffect(() => {
    const sync = () => {
      const active = getFullscreenElement() === containerRef.current;
      // If user hit ESC or system UI, active will be false.
      // We only call onToggle when there's a mismatch, to avoid loops.
      if (active !== isFullscreen) onToggleFullscreen();
      // If we exited real FS somehow while in pseudo, ensure pseudo is off.
      if (!active) setPseudoFS(false);
    };

    const evts = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'] as const;
    evts.forEach(evt => document.addEventListener(evt, sync));
    return () => {
      evts.forEach(evt => document.removeEventListener(evt, sync));
    };
  }, [isFullscreen, onToggleFullscreen]);

  // ESC exits FS (works for both real & pseudo)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (getFullscreenElement()) {
        exitDocFullscreen().catch(() => {});
      } else if (pseudoFS) {
        setPseudoFS(false);
        if (isFullscreen) onToggleFullscreen();
        document.documentElement.style.removeProperty('overflow');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pseudoFS, isFullscreen, onToggleFullscreen]);

  const enterFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    // If already in real FS, do nothing.
    if (getFullscreenElement() === el) return;

    try {
      await requestElementFullscreen(el);
      // onToggleFullscreen is called by the fullscreenchange listener.
    } catch (err) {
      // No Fullscreen API (iOS Safari). Fallback to pseudo fullscreen.
      setPseudoFS(true);
      document.documentElement.style.overflow = 'hidden';
      if (!isFullscreen) onToggleFullscreen();
    }
  }, [isFullscreen, onToggleFullscreen]);

  const exitFullscreen = useCallback(async () => {
    if (getFullscreenElement()) {
      await exitDocFullscreen().catch(() => {});
      // onToggleFullscreen fires via fullscreenchange
    } else if (pseudoFS) {
      setPseudoFS(false);
      document.documentElement.style.removeProperty('overflow');
      if (isFullscreen) onToggleFullscreen();
    }
  }, [pseudoFS, isFullscreen, onToggleFullscreen]);

  // ---------- RENDER ----------
  if (hasError) {
    return (
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
    );
  }

  return (
    <div className="space-y-4">
      {/* Fullscreen Button (outside the container) */}
      <div className="flex justify-end">
        {!(isFullscreen || pseudoFS) ? (
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
        ) : (
          <Button
            onClick={exitFullscreen}
            variant="outline"
            size="sm"
            className="bg-background-glass border-glass-border hover:bg-glass-primary transition-all duration-200 hover:scale-105"
          >
            <Minimize className="w-4 h-4 mr-2" />
            Exit
          </Button>
        )}
      </div>

      {/* ONE persistent container. Never unmount/replace this node. */}
      <div
        ref={containerRef}
        // If real FS is active, browser controls sizing; for pseudo, we pin fixed.
        className={[
          'relative rounded-lg overflow-hidden bg-gradient-card backdrop-blur-glass border-glass-border',
          // Maintain 16:9 box when not fullscreen/pseudo
          !(isFullscreen || pseudoFS) ? 'aspect-video' : '',
          // Pseudo fullscreen styling (iOS fallback)
          pseudoFS ? 'fixed inset-0 z-50 bg-black' : '',
        ].join(' ')}
        // Ensure it's focusable if needed (some browsers require focus for keyboard)
        tabIndex={-1}
      >
        {/* Top-left exit button when fullscreen/pseudo (inside container to survive pointer lock) */}
        {(isFullscreen || pseudoFS) && (
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
        )}

        {/* Loading Overlay */}
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
                <p className="text-sm text-muted-foreground">
                  {Math.round(Math.min(loadProgress, 100))}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Game iframe (keep attributes that allow FS within iframe if needed) */}
        <iframe
          ref={iframeRef}
          src={`/games/${game.folder}/index.html`}
          className="w-full h-full border-0"
          title={game.title}
          allowFullScreen
          // Allow fullscreen + inputs (esp. for Unity WebGL)
          allow="fullscreen *; gamepad; autoplay; microphone; camera"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ background: isUnityGame ? '#000' : 'transparent' }}
        />
      </div>
    </div>
  );
};
