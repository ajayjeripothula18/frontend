import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth.config';
import { z } from 'zod';

const noteSchema = z.object({
  content: z.string().min(1, 'Note content is required')
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await fetch(
      `${process.env.API_URL}/leads/${params.id}/notes`,
      {
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Get Lead Notes API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const validatedData = noteSchema.parse(body);

    const response = await fetch(
      `${process.env.API_URL}/leads/${params.id}/notes`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({
        errors: error.errors
      }), { status: 400 });
    }

    console.error('Create Lead Note API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 