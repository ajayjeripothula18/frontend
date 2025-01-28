import { NextResponse } from 'next/server';

const mockCustomers = [
  {
    customerId: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1234567890',
    companyName: 'Tech Corp',
    website: 'https://techcorp.com',
    industry: 'Technology',
    status: 'ACTIVE',
    assignedAgentId: '1',
    notes: ['VIP customer', 'Regular follow-up needed'],
    activities: [
      {
        activityId: '1',
        type: 'CALL',
        details: 'Discussed new requirements',
        createdAt: '2024-02-20T10:00:00Z',
      },
    ],
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z',
  },
  // Add more mock customers as needed
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const searchTerm = searchParams.get('searchTerm') || '';
    const isActive = searchParams.get('isActive') === 'true';

    let filteredCustomers = [...mockCustomers];
    if (searchTerm) {
      filteredCustomers = mockCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (isActive !== undefined) {
      filteredCustomers = filteredCustomers.filter(customer => 
        customer.status === (isActive ? 'ACTIVE' : 'INACTIVE')
      );
    }

    const totalCount = filteredCustomers.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    return NextResponse.json({
      statusCode: 200,
      timestamp: new Date().toISOString(),
      data: {
        customers: paginatedCustomers,
        totalCount,
        pageSize: limit,
        currentPage: page,
        totalPages,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCustomer = {
      customerId: (mockCustomers.length + 1).toString(),
      ...body,
      activities: [],
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockCustomers.push(newCustomer);

    return NextResponse.json({
      statusCode: 201,
      timestamp: new Date().toISOString(),
      data: newCustomer,
    }, { status: 201 });
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