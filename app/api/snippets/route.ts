import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { content, fileType } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql`
      INSERT INTO snippets (content, file_type, created_at)
      VALUES (${content}, ${fileType || 'txt'}, NOW())
      RETURNING id
    `;

    const snippetId = result[0].id;

    return NextResponse.json(
      { id: snippetId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating snippet:', error);
    return NextResponse.json(
      { error: 'Failed to create snippet' },
      { status: 500 }
    );
  }
}
