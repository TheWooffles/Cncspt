import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Minimize } from 'lucide-react';

interface GameLoaderProps {
  game: {
    title: string;
    folder: string;
    thumbnail: string;
  };
  isFullscreen: boolean;
  onExitFullscreen: () => void;
}

export const GameLoader = ({ game, isFullscreen, onExitFullscreen }: GameLoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Request fullscreen for the container
  const requestFullscreen = async () => {
    if (containerRef.current && containerRef.current.requestFullscreen) {
      await containerRef.current.requestFullscreen();
    }
  };

  // Exit fullscreen
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
    </div>
  );
};
