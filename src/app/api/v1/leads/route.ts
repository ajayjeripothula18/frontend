import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth.config';
import { z } from 'zod';
import { LeadSource, LeadStatus } from '@/types/leads';

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  source: z.enum(['WEBSITE', 'REFERRAL', 'SOCIAL', 'DIRECT', 'OTHER'] as const),
  potentialValue: z.number().min(0).optional(),
  notes: z.string().optional(),
  assignedAgentId: z.number().optional()
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') as LeadStatus;
    const source = searchParams.get('source') as LeadSource;
    const searchTerm = searchParams.get('searchTerm');

    const response = await fetch(`${process.env.API_URL}/api/v1/leads`, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Leads API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    const response = await fetch(`${process.env.API_URL}/api/v1/leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({
        errors: error.errors
      }), { status: 400 });
    }

    console.error('Create Lead API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}