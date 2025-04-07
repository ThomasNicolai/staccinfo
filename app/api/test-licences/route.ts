import { NextResponse } from 'next/server';
import { getActiveLicenses } from '@/lib/queries';

export async function GET() {
  try {
    const data = await getActiveLicenses(190); // Change ID as needed
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch licences' }, { status: 500 });
  }
}

