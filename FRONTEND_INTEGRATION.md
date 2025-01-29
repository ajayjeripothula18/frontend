# HyperMiles CRM Backend - Frontend Integration Guide

## Overview
This document provides essential information for frontend developers to integrate with the HyperMiles CRM Backend API.

## Base URLs
- Development: `http://localhost:3001/api/v1`
- Frontend API Routes: `/api/v1`

## Authentication

### Login Endpoint
- **URL**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
```typescript
{
  email: string;
  password: string;
  rememberMe?: boolean;
}
```
- **Response**:
```typescript
{
  accessToken: string;
  expires_at: Date; // 15 minutes from issuance
  token_type: 'Bearer';
  refreshToken: string; // Valid for 7 days
}
```

### Token Refresh
- **URL**: `/auth/refresh-token`
- **Method**: `POST`
- **Request Body**:
```typescript
{
  refreshToken: string;
}
```

### Authentication Headers
All authenticated requests should include:
```
Authorization: Bearer {accessToken}
```

## Lead Management

### Lead Response Structure
```typescript
interface LeadResponse {
  leadId: number;
  name: string;
  email: string;
  phone?: string;
  source: string;
  status: string;
  assignedAgent?: {
    userId: number;
    name: string;
    email: string;
  };
  potentialValue?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Lead Activities
- **URL**: `/leads/{leadId}/activities`
- **Method**: `GET`
- **Response Structure**:
```typescript
interface LeadActivity {
  id: number;
  leadId: number;
  userId: number;
  type: LeadActivityType;
  description: string;
  createdAt: Date;
  user: {
    userId: number;
    name: string;
    email: string;
  }
}

enum LeadActivityType {
  CREATED = 'Created',
  STATUS_UPDATED = 'Status Updated',
  UPDATED = 'Updated',
  ASSIGNED = 'Assigned',
  NOTE_ADDED = 'NOTE_ADDED',
  ARCHIVED = 'Archived',
  DELETED = 'DELETED',
  SCORED = 'SCORED',
  QUALIFIED = 'QUALIFIED',
  CONVERTED = 'Converted',
  MERGED = 'Merged',
  ESCALATED = 'Escalated'
}
```

## Error Handling

### HTTP Status Codes
- `200`: Success
- `400`: Bad Request (Invalid input)
- `401`: Unauthorized (Invalid/expired token)
- `403`: Forbidden (Insufficient permissions)
- `404`: Not Found
- `429`: Too Many Requests (Rate limiting)
- `500`: Internal Server Error

### Error Response Structure
```typescript
{
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
}
```

## Rate Limiting
The API implements rate limiting on sensitive endpoints:
- Login: 5 attempts per minute
- Password reset: 3 attempts per 15 minutes

## User Roles and Permissions
```typescript
enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  AGENT = 'agent'
}
```

## API Endpoints Reference

### Authentication
- `POST /auth/login` - User login
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get current user profile

### Leads
- `GET /leads` - List leads
- `POST /leads` - Create lead
- `GET /leads/{id}` - Get lead details
- `PUT /leads/{id}` - Update lead
- `DELETE /leads/{id}` - Delete lead
- `GET /leads/{id}/activities` - Get lead activities
- `PUT /leads/{id}/convert` - Convert lead to customer
- `PUT /leads/{id}/score` - Score lead
- `PUT /leads/{id}/assign` - Assign lead to agent
- `PUT /leads/{id}/status` - Update lead status

## Best Practices

### Token Management
1. Store tokens securely (preferably in HTTP-only cookies)
2. Implement token refresh mechanism
3. Clear tokens on logout

### Error Handling
1. Implement global error handling
2. Show user-friendly error messages
3. Log errors for debugging

### Data Validation
1. Validate input before sending to API
2. Handle all possible API response states
3. Implement proper form validation

## Development Setup

1. Ensure backend is running on `http://localhost:3001`
2. Configure environment variables
3. Set up authentication interceptors
4. Implement token refresh logic

## TypeScript Interfaces

For type safety, use these interfaces in your frontend code:

```typescript
interface AuthResponse {
  accessToken: string;
  expires_at: Date;
  token_type: string;
  refreshToken: string;
}

interface UserProfile {
  userId: number;
  email: string;
  name: string;
  roleId: number;
  isActive: boolean;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse<T> {
  status: 'success';
  timestamp: string;
  data: T;
}
```

## Common Issues and Solutions

1. Token Expiration
   - Implement automatic token refresh
   - Handle 401 responses globally

2. CORS Issues
   - Backend is configured to accept requests from frontend origin
   - Ensure correct origin is set in development

3. Rate Limiting
   - Implement exponential backoff for retries
   - Show appropriate user feedback

## Support and Resources

- Backend Repository: [GitHub Repository URL]
- API Documentation: [Swagger/OpenAPI URL]
- Backend Team Contact: [Contact Information]

## Changelog

### Version 1.0.0
- Initial release
- Basic authentication
- Lead management features
- Activity tracking 