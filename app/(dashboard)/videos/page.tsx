import { getVideos } from '@/lib/db';
import VideoCard from './[slug]/videoCard';
import Link from 'next/link';

export default async function VideosPage() {
  const { videos } = await getVideos();

  return (
    <div className="page">
      <h1>Videos</h1>
      {videos.map(function (video, i) {
        return (
          <Link href={`./videos/${video.slug}`} key={video.id}>
            <VideoCard video={video} key={video.id} />
          </Link>
        );
      })}
    </div>
  );
}
