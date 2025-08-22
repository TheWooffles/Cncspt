import React, { useEffect, useRef } from 'react';

interface GameLoaderProps {
  game: {
    title: string;
    url: string;
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

  useEffect(() => {
    if (isFullscreen) {
      const element = iframeRef.current?.parentElement;
      if (element?.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

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
    <iframe
      ref={iframeRef}
      src={game.url}
      title={game.title}
      className="w-full h-full rounded-lg border border-glass-border"
      allowFullScreen
    ></iframe>
  );
};
