import { NextResponse } from 'next/server';

export async function GET() {
  // Example logic for seeding data
  return NextResponse.json({ message: 'Seed route is working!' });
}