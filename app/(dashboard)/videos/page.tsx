import { getVideos } from '@/lib/db';
import VideoClient from './videoClient';

export default async function VideosPage() {
  const { videos } = await getVideos();
  return <VideoClient initialVideos={videos} />;
}
