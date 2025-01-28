import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock validation
    if (!email || !password) {
      return NextResponse.json(
        {
          statusCode: 400,
          timestamp: new Date().toISOString(),
          message: 'Email and password are required',
        },
        { status: 400 }
      );
    }

    // Mock credentials check
    if (email === 'admin@example.com' && password === 'admin123') {
      return NextResponse.json({
        statusCode: 200,
        timestamp: new Date().toISOString(),
        data: {
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: {
            userId: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            roleId: 'admin',
            phone: '+1234567890',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      });
    }

    return NextResponse.json(
      {
        statusCode: 401,
        timestamp: new Date().toISOString(),
        message: 'Invalid credentials',
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        timestamp: new Date().toISOString(),
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}