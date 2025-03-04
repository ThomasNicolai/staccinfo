import * as React from 'react';
import type { Video } from '@/lib/db';
import { getVideos } from '@/lib/db';
import VideoClient from './videoClient';

export default async function VideosPage() {
  // Server-side data fetching
  const { videos } = await getVideos();
  
  return <VideoClient initialVideos={videos} />;
}

interface VideoClientProps {
  initialVideos: Video[];
}
