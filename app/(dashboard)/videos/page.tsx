import * as React from 'react';
import type { Video } from '@/lib/db';
import { getVideos } from '@/lib/db';
import VideoClient from './videoClient';

// This is a server component - no 'use client' directive
export default async function VideosPage() {
  // Server-side data fetching
  const { videos } = await getVideos();
  
  return <VideoClient initialVideos={videos} />;
}

interface VideoClientProps {
  initialVideos: Video[];
}
