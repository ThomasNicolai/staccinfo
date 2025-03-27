// page.tsx (Server Component)
import { getVideo, getVideos } from '@/lib/db';
import Link from 'next/link';
import VideoDetailContent from './videoDetailContent'; // our new client component
import VideoCard from '../videoCard';

export default async function VideoDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { video } = await getVideo(slug);
  const { videos } = await getVideos();
  const relatedVideos = videos.filter((v) => v.slug !== slug).slice(0, 3);

  if (!video) {
    return <div>Video not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white flex flex-col items-center">
      <div className="w-full max-w-6xl px-6 overflow-y-auto">
        <Link href="/videos" className="back-button">
          ← Tilbake til videoer
        </Link>
        <h1 className="video-title">{video.title}</h1>
        <VideoDetailContent video={video} relatedVideos={relatedVideos} />
      </div>
    </div>
  );
}