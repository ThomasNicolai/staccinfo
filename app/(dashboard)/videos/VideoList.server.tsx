'use server';
import Link from 'next/link';
import { getVideos, getVideoProgression } from '@/lib/db';
import VideoCard from './videoCard';
import type { Video } from '@/lib/db';

export default async function VideoList() {
  // Set dummy userId to 1, needs to be changed to the actual userId
  const userId = 1;
  
  // Fetch all videos.
  const { videos } = await getVideos();
  
  // For each video, fetch its progression data.
  const videosWithProgression = await Promise.all(
    videos.map(async (video: Video) => {
      const progression = await getVideoProgression(userId, video.id);
      return { ...video, progression };
    })
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videosWithProgression.map((video) => (
        <Link href={`/videos/${video.id}`} key={video.id}>
          <VideoCard video={video} progression={video.progression || undefined} />
        </Link>
      ))}
    </div>
  );
}
