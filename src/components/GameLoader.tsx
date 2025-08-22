import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Minimize, Maximize } from 'lucide-react';

interface GameLoaderProps {
  game: {
    title: string;
    folder: string;
    thumbnail: string;
  };
  isFullscreen: boolean;
  onExitFullscreen: () => void;
  onEnterFullscreen: () => void;
}

export const GameLoader = ({ game, isFullscreen, onExitFullscreen, onEnterFullscreen }: GameLoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const requestFullscreen = async () => {
    if (containerRef.current && containerRef.current.requestFullscreen) {
      await containerRef.current.requestFullscreen();
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      requestFullscreen();
    } else {
      exitFullscreen();
    }
  }, [isFullscreen]);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] bg-black">
      <iframe
        src={`/games/${game.folder}/index.html`}
        title={game.title}
        className="w-full h-full border-none"
        allowFullScreen
      ></iframe>

      {/* Exit Fullscreen Button */}
      {isFullscreen && (
        <div className="absolute top-3 left-3 z-50">
          <Button
            onClick={async () => {
              await exitFullscreen();
              onExitFullscreen();
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

      {/* Bottom Bar */}
      {!isFullscreen && (
        <div className="absolute bottom-0 left-0 w-full bg-background-glass/90 backdrop-blur-glass border-t border-glass-border flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-8 h-8 rounded object-cover border border-glass-border"
            />
            <span className="text-foreground font-semibold">{game.title}</span>
          </div>
          <Button
            onClick={() => onEnterFullscreen()}
            variant="outline"
            size="sm"
            className="bg-background-glass hover:bg-glass-primary"
          >
            <Maximize className="w-4 h-4 mr-2" /> Fullscreen
          </Button>
        </div>
      )}
    </div>
  );
};
