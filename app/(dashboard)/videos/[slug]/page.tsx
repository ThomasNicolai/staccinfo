// page.tsx (Server Component)
import { getVideo, getVideos } from '@/lib/db';
import Link from 'next/link';
import VideoDetailContent from './videoDetailContent'; // our new client component
import VideoCard from '../videoCard';
import { notFound } from 'next/navigation';
import { Video } from '@/lib/db';

export default async function VideoDetailPage({ params }: { params: any }) {
  // Cast params to the expected plain object type
  const { slug } = await params;
  const videoId = parseInt(slug, 10);
  if (isNaN(videoId)) {
    return notFound();
  }
  const { video } = await getVideo(videoId);
  if (!video) {
    return notFound();
  }
  const { videos } = await getVideos();

  let relatedVideos: Video[] = [];

  if (video.tag && typeof video.tag === 'string') {
    const videoTags = video.tag.split(',').map((tag) => tag.trim());

    relatedVideos = videos
      .filter(
        (v) =>
          // Don't include the current video
          v.id !== video.id &&
          // Make sure the video has tags
          v.tag &&
          // Check if any tags match
          typeof v.tag === 'string' &&
          videoTags.some((tag) => v.tag.includes(tag))
      )
      .slice(0, 4); // Limit to 4 related videos
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:text-white flex flex-col items-center">
      <div className="w-full px-4 md:px-8 max-w-screen-2xl mx-auto mt-2 mb-1">
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
        >
          ← Tilbake til videoer
        </Link>
        <h1 className="text-3xl md:text-3xl font-bold mt-4">{video.title}</h1>
      </div>

      {/* Full-width content goes here */}
      <div className="w-full">
        <VideoDetailContent video={video} relatedVideos={relatedVideos} />
      </div>
    </div>
  );
}
