import { NextResponse } from 'next/server';
import { getActiveLicencesByCustomer } from '@/lib/db';

export async function GET() {
  try {
    const licences = await getActiveLicencesByCustomer(190);
    return NextResponse.json({ licences });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch licences' }, { status: 500 });
  }
}
