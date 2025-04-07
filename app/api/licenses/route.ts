import { NextResponse } from 'next/server';
import { getActiveLicenses } from '@/lib/queries';

export async function GET() {
  try {
    const licenses = await getActiveLicenses(190); // test with CustomerId = 190
    return NextResponse.json({ data: licenses });
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return new NextResponse('Failed to fetch licenses', { status: 500 });
  }
}





