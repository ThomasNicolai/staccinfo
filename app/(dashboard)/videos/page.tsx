'use server';
import VideoClient from './videoClient';
import { getVideos, getVideoProgression } from '@/lib/db';
import type { Video } from '@/lib/db';

export default async function VideosPage() {
  const userId = 1; // Replace with the actual user id when available

  // Get videos from the database
  const { videos } = await getVideos();

  // Merge each video with its progression data
  const videosWithProgression = await Promise.all(
    videos.map(async (video: Video) => {
      const progression = await getVideoProgression(userId, video.id);
      return { ...video, progression: progression ?? undefined };
    })
  );

  return (
    <div className="relative min-h-screen">
      {/* Decorative circle in background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <VideoClient initialVideos={videosWithProgression} />
      </div>
    </div>
  );
}
