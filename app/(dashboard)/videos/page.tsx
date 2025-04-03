import { getVideos } from '@/lib/db';
import Link from 'next/link';
import VideoCard from './videoCard';

export default async function VideosPage() {
  // Get all videos from database
  const { videos } = await getVideos();

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Videoer</h1>

        {videos.length === 0 ? (
          <p>Ingen videoer funnet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
