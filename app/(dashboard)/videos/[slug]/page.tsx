// page.tsx (Server Component)
import { getVideo, getVideos } from '@/lib/db';
import Link from 'next/link';
import VideoDetailContent from './videoDetailContent'; // our new client component
import VideoCard from '../videoCard';

export default async function VideoDetailPage({ params }: { params: any }) {
  // Cast params to the expected plain object type
  const { slug } = await params;
  const { video } = await getVideo(slug);
  const { videos } = await getVideos();
  const relatedVideos = videos.filter((v) => v.slug !== slug).slice(0, 3);

  if (!video) {
    return <div>Video not found.</div>;
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
  <h1 className="text-3xl md:text-3xl font-bold mt-4">
    {video.title}
  </h1>
</div>


  {/* Full-width content goes here */}
  <div className="w-full">
    <VideoDetailContent video={video} relatedVideos={relatedVideos} />
  </div>
</div>
  );
}
