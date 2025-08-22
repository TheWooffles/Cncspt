import { useEffect, useRef } from 'react';
import { Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameLoaderProps {
  game: {
    title: string;
    folder: string;
    thumbnail: string;
  };
  isFullscreen: boolean;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
}

export const GameLoader: React.FC<GameLoaderProps> = ({
  game,
  isFullscreen,
  onEnterFullscreen,
  onExitFullscreen,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && iframeRef.current) {
      iframeRef.current.requestFullscreen();
      onEnterFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      onExitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onExitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onExitFullscreen]);

  return (
    <div className="relative w-full aspect-[16/9] bg-black rounded-xl overflow-hidden">
      {/* Game iframe */}
      <iframe
        ref={iframeRef}
        src={`/games/${game.folder}/index.html`}
        title={game.title}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
      ></iframe>

      {/* Bottom Bar */}
      {!isFullscreen && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-8 h-8 rounded object-cover"
            />
            <span className="text-white font-semibold text-sm">{game.title}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/10"
          >
            <Maximize className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
