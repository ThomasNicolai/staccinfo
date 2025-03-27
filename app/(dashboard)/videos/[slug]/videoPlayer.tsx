import YouTubePlayer from './youtubePlayer';
import VimeoPlayer from './vimeoPlayer';

interface VideoPlayerProps {
  video: { slug: string; url: string; title: string };
  onProgressChange?: (progress: number) => void;
}

export default function VideoPlayer({ video, onProgressChange }: VideoPlayerProps) {
  if (video.url.includes('vimeo.com')) {
    return <VimeoPlayer video={video} onProgressChange={onProgressChange} />;
  } else if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
    return <YouTubePlayer video={video} onProgressChange={onProgressChange} />;
  } else {
    return <div>Unsupported video provider</div>;
  }
}