// page.tsx (Server Component)
import { getVideo, getVideos } from '@/lib/db';
import Link from 'next/link';
import VideoDetailContent from './videoDetailContent'; // our new client component
import VideoCard from '../videoCard';
import { notFound } from 'next/navigation';
import { Video } from '@/lib/db';

export default async function VideoDetailPage({ params }: { params: any }) {
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

  console.log('Current video:', video.id, 'tag:', video.tag);

  let relatedVideos: Video[] = [];

  const videoTags = Array.isArray(video.tag)
    ? video.tag
    : typeof video.tag === 'string'
      ? video.tag.split(',').map((tag) => tag.trim())
      : [];

  if (videoTags.length > 0) {
    relatedVideos = videos
      .filter((v) => {
        // Don't include the current video
        if (v.id === video.id) return false;

        // Get tags from the other video (handle both array and string formats)
        const otherTags = Array.isArray(v.tag)
          ? v.tag
          : typeof v.tag === 'string'
            ? v.tag.split(',').map((t) => t.trim())
            : [];

        console.log('Checking video:', v.id, 'tags:', otherTags);

        // Check for matches
        const matches = videoTags.some((tag) => otherTags.includes(tag));
        console.log('Matches:', matches);
        return matches;
      })
      .slice(0, 4);
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
