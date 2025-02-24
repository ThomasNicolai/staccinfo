import { getVideos } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const videos = await getVideos();
  return NextResponse.json(videos);
}