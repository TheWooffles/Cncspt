import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import { Game } from '@/types/game';

interface GameLoaderProps {
  game: Game;
  isFullscreen: boolean;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
}

export const GameLoader = ({
  game,
  isFullscreen,
  onEnterFullscreen,
  onExitFullscreen,
}: GameLoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pseudoFS, setPseudoFS] = useState(false);

  // Handle fullscreen toggle
  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      try {
        await container.requestFullscreen();
        onEnterFullscreen();
      } catch {
        setPseudoFS(true);
        onEnterFullscreen();
        document.documentElement.style.overflow = 'hidden';
      }
    } else {
      if (document.exitFullscreen) await document.exitFullscreen();
      setPseudoFS(false);
      onExitFullscreen();
      document.documentElement.style.removeProperty('overflow');
    }
  };

  // ESC key handling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (pseudoFS) {
          setPseudoFS(false);
          onExitFullscreen();
          document.documentElement.style.removeProperty('overflow');
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pseudoFS, onExitFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-lg overflow-hidden ${
        pseudoFS ? 'fixed inset-0 z-50 bg-black' : ''
      }`}
      style={{ aspectRatio: '16/9' }}
    >
      {/* Bottom Bar */}
      {!isFullscreen && !pseudoFS && (
        <div className="absolute bottom-0 left-0 right-0 bg-background-glass backdrop-blur-glass border-t border-glass-border flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-10 h-10 rounded object-cover"
            />
            <h3 className="text-lg font-semibold text-foreground">{game.title}</h3>
          </div>
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="icon"
            className="bg-background-glass border-glass-border hover:bg-glass-primary"
          >
            <Maximize className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Exit fullscreen button */}
      {(isFullscreen || pseudoFS) && (
        <div className="absolute top-2 left-2 z-50">
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="sm"
            className="bg-background-glass/90 backdrop-blur-glass border-glass-border hover:bg-glass-primary shadow-lg"
          >
            <Minimize className="w-3 h-3 mr-1" />
            <span className="text-xs">Exit</span>
          </Button>
        </div>
      )}

      <iframe
        src={`/games/${game.folder}/index.html`}
        title={game.title}
        className="w-full h-full border-0"
        allowFullScreen
        allow="fullscreen *; gamepad; autoplay; microphone; camera"
      />
    </div>
  );
};
