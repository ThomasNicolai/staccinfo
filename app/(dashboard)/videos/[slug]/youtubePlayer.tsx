'use client';
import { useEffect, useRef } from 'react';
import { Video } from '@/lib/db';

interface YoutubePlayerProps {
  video: Video;
  onProgressChange?: (progress: number) => void;
}

export default function YoutubePlayer({
  video,
  onProgressChange
}: YoutubePlayerProps) {
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerId = `youtube-player-${video.id}`;

  // Extract the YouTube video ID from a URL
  function getYouTubeVideoId(url: string): string | null {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^?&]+)/
    );
    return match ? match[1] : null;
  }

  useEffect(() => {
    const videoId = getYouTubeVideoId(video.url);
    if (!videoId) {
      console.error('Invalid YouTube URL:', video.url);
      return;
    }

    function createPlayer() {
      console.log('Creating YouTube player for videoId:', videoId);

      playerRef.current = new (window as any).YT.Player(playerContainerId, {
        videoId,
        events: {
          onReady: () => {
            console.log('YouTube Player Ready');
          },
          onStateChange: onPlayerStateChange
        }
      });
    }

    if (!(window as any).YT || !(window as any).YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [video.id, video.url]);

  function onPlayerStateChange(event: any) {
    const state = (window as any).YT?.PlayerState;
    console.log('YouTube state changed:', event.data);

    if (event.data === state?.PLAYING) {
      console.log('▶Video started playing');

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (!playerRef.current) {
          console.warn('⚠️ Player not ready');
          return;
        }

        const currentTime = playerRef.current.getCurrentTime?.();
        const duration = playerRef.current.getDuration?.();

        console.log('currentTime:', currentTime, 'duration:', duration);

        if (
          typeof currentTime === 'number' &&
          typeof duration === 'number' &&
          duration > 0
        ) {
          const progressPercentage = (currentTime / duration) * 100;
          console.log('Calculated progress:', progressPercentage.toFixed(2));
          onProgressChange?.(progressPercentage);
        }
      }, 1000);
    }

    if (event.data === state?.PAUSED || event.data === state?.ENDED) {
      console.log('⏸ Video paused or ended');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden w-full">
      {/* Let YouTube inject its iframe here */}
      <div id={playerContainerId} />
    </div>
  );
}
