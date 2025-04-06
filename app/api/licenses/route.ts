import { NextResponse } from 'next/server';
import { getActiveLicenses } from '@/lib/queries';

export async function GET() {
  try {
    const licenses = await getActiveLicenses(190); // replace with dynamic ID if needed
    return NextResponse.json({ data: licenses });
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return NextResponse.json({ error: 'Failed to fetch licenses' }, { status: 500 });
  }
}




