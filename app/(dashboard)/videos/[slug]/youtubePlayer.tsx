'use client';
import { useEffect, useState, useRef } from 'react';

interface YoutubePlayerProps {
  video: {slug: string; url: string; title: string};
  onProgressChange?: (progress: number) => void;
}

export default function YoutubePlayer({video, onProgressChange }: YoutubePlayerProps){
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Ensure the Youtube IFrame API is loaded
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player(`youtube-player-${video.slug}`, {
        events: {
          onStateChange: onPlayerStateChange,
        }
      });
    };

    function onPlayerStateChange(event: any) {
      if (event.data === (window as any).YT.PlayerState.PLAYING) {
        const interval = setInterval(() => {
          const currentTime = playerRef.current?.getCurrentTime();
          const duration = playerRef.current?.getDuration();
          if (currentTime && duration) {
            const progressPercentage = (currentTime / duration) * 100;
            onProgressChange && onProgressChange(progressPercentage);
            localStorage.setItem(`progress-${video.slug}`, progressPercentage.toString());
          }
        }, 1000); // Updates progress every second
      }
    }
  }, [video.slug, onProgressChange]);

  function getYouTubeEmbedUrl(url: string): string {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^?&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }
    



  return (<div className="aspect-video bg-black rounded-lg overflow-hidden w-full">
    <iframe
      id={`youtube-player-${video.slug}`}
      src={getYouTubeEmbedUrl(video.url)}
      title={video.title}
      width="100%"
      height="100%"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
  );
}