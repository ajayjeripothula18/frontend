import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        {
          statusCode: 400,
          timestamp: new Date().toISOString(),
          message: 'Refresh token is required',
        },
        { status: 400 }
      );
    }

    // Mock token refresh
    return NextResponse.json({
      statusCode: 200,
      timestamp: new Date().toISOString(),
      data: {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      },
    });
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