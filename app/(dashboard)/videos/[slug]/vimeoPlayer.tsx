'use client';
import { useEffect, useRef } from 'react';
import Player from '@vimeo/player';
import { Video } from '@/lib/db';

interface VimeoPlayerProps {
  video: Video;
  onProgressChange?: (progress: number) => void;
}

export default function VimeoPlayer({
  video,
  onProgressChange
}: VimeoPlayerProps) {
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const iframe = document.getElementById(
      `vimeo-player-${video.id}`
    ) as HTMLIFrameElement;
    if (iframe) {
      playerRef.current = new Player(iframe);
      playerRef.current.on('timeupdate', (data) => {
        const { seconds, duration } = data;
        if (duration > 0) {
          const progressPercentage = (seconds / duration) * 100;
          onProgressChange && onProgressChange(progressPercentage);
        }
      });
    }
  }, [video.id, onProgressChange]);

  function getVimeoEmbedUrl(url: string): string {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : url;
  }

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden w-full">
      <iframe
        id={`vimeo-player-${video.id}`}
        src={getVimeoEmbedUrl(video.url)}
        title={video.title}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
