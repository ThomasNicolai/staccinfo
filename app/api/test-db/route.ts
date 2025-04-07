// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { getVideos } from '@/lib/db';

export async function GET() {
  try {
    const result = await getVideos();
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('DB Test Error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
