import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth.config';
import { z } from 'zod';
import { LeadStatus } from '@/types/leads';

const statusSchema = z.object({
  status: z.enum(Object.values(LeadStatus) as [string, ...string[]]),
  statusNote: z.string().optional()
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const validatedData = statusSchema.parse(body);

    const response = await fetch(
      `${process.env.API_URL}/api/v1/leads/${params.id}/status`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
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

    console.error('Update Lead Status API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 