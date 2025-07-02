import { NextResponse } from 'next/server';
import { getPublications } from '@/lib/publications';

export async function GET() {
  try {
    const publications = getPublications();
    return NextResponse.json(publications);
  } catch (error) {
    console.error('Failed to fetch publications:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
