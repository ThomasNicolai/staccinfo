// app/videos/[slug]/page.tsx
import { getVideo } from '@/lib/db';
import Link from 'next/link';

export default async function VideoDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { video } = await getVideo(slug);

  if (!video) {
    return <div>Video not found.</div>;
  }

  return (
    <div className="page">
      <Link
        href="/videos"
        className="inline-block bg-gray-200 text-gray-900 py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition-colors duration-200"
      >
        ← Back to Videos
      </Link>
      <h1>{video.title}</h1>
      {/* Using a fixed height container for debugging */}
      <div style={{ aspectRatio: '16 / 9' }}>
        <iframe
          src={video.url}
          title={video.title}
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>Length: {video.length} seconds</p>
    </div>
  );
}
