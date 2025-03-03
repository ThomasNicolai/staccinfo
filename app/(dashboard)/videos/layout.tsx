import { getVideos } from '@/lib/db';
import VideosPage from './page';

export default async function VideosLayout() {
  const videos = await getVideos();
  
  return <VideosPage initialVideos={videos.videos} />;
}