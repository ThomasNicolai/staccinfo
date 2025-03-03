import { getVideo } from '@/lib/db';

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { video } = await getVideo(slug);

  return (
    <div>
      <h2>{video.title}</h2>
      <div className="video-player-container">{video.url}</div>
    </div>
  );
}