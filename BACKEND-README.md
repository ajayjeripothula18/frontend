# HyperMiles CRM Backend

## Overview
HyperMiles CRM Backend is a robust CRM system built with NestJS, providing a comprehensive API for lead management, user authentication, and activity tracking.

## Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Quick Start

1. **Clone the repository**
```bash
git clone [repository-url]
cd hypermiles-crm-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Copy the example environment file and update it with your configurations:
```bash
cp .env.example .env
```

Required environment variables:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=hypermiles_crm

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

# Server
PORT=3001
NODE_ENV=development
```

4. **Database Setup**
```bash
# Run migrations
npm run migration:run
```

5. **Start the Development Server**
```bash
npm run start:dev
```

The server will start on `http://localhost:3001`

## API Documentation
- Swagger UI: `http://localhost:3001/api/docs`
- Frontend Integration Guide: See `FRONTEND_INTEGRATION.md`

## Development

### Database Migrations
```bash
# Generate a new migration
npm run migration:generate src/database/migrations/MigrationName

# Create a new empty migration
npm run migration:create src/database/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

### Testing
```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure
```
src/
├── auth/           # Authentication module
├── leads/          # Lead management module
├── users/          # User management module
├── common/         # Shared utilities and decorators
├── config/         # Configuration files
├── database/       # Database migrations and config
└── main.ts         # Application entry point
```

## Features
- JWT Authentication with refresh tokens
- Role-based access control
- Lead management and tracking
- Activity logging
- Rate limiting
- Error handling
- Database migrations
- API documentation with Swagger

## Contributing
1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License
[License Type]

## Support
For support and questions, please contact [contact information]
