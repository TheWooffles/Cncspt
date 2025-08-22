import { useEffect, useRef } from 'react';
import { Game } from '@/types/game';

interface GameLoaderProps {
  game: Game;
  isFullscreen: boolean;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
}

export const GameLoader = ({ game, isFullscreen, onEnterFullscreen, onExitFullscreen }: GameLoaderProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle fullscreen changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isFullscreen && container.requestFullscreen) {
      container.requestFullscreen().catch(() => {
        onEnterFullscreen();
      });
    } else if (!isFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {
        onExitFullscreen();
      });
    }
  }, [isFullscreen, onEnterFullscreen, onExitFullscreen]);

  // Sync when user presses ESC
  useEffect(() => {
    const handleFSChange = () => {
      if (!document.fullscreenElement) {
        onExitFullscreen();
      }
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFSChange);
    };
  }, [onExitFullscreen]);

  return (
    <div ref={containerRef} className="w-full h-full relative rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        src={`/games/${game.folder}/index.html`}
        title={game.title}
        className="w-full h-full border-0"
        allowFullScreen
        allow="fullscreen *; gamepad; autoplay; microphone; camera"
      />
    </div>
  );
};
