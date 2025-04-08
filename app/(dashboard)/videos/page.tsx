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

  return <VideoClient initialVideos={videosWithProgression} />;
}
