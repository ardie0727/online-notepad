import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql`
      SELECT id, content, file_type, created_at
      FROM snippets
      WHERE id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Snippet not found' },
        { status: 404 }
      );
    }

    const snippet = result[0];
    return NextResponse.json(snippet);
  } catch (error) {
    console.error('Error fetching snippet:', error);
    return NextResponse.json(
      { error: 'Failed to fetch snippet' },
      { status: 500 }
    );
  }
}
