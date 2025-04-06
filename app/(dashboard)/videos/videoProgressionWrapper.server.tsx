'use server';
import VideoCard from './videoCard';
import { getVideoProgression } from '@/lib/db';
import type { Video } from '@/lib/db';

type Props = {
  video: Video;
  userId: number;
};

export default async function VideoProgressionWrapper({ video, userId }: Props) {
  const progression = await getVideoProgression(userId, video.id);
  return <VideoCard video={video} progression={progression || undefined} />;
}
