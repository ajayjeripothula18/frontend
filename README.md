# HyperMiles CRM Frontend

A modern CRM system built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🔐 Authentication with NextAuth.js
- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive design
- 🔄 Real-time updates
- 📊 Dashboard analytics
- 👥 User management
- 📈 Lead management
- 🎯 Role-based access control

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Radix UI](https://www.radix-ui.com/)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/hypermiles-crm-frontend.git
cd hypermiles-crm-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── auth/           # Authentication components
│   └── dashboard/      # Dashboard components
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── lib/               # Utility functions
├── providers/         # React context providers
├── services/          # API services
├── styles/           # Global styles
└── types/            # TypeScript type definitions
```

## Development Guidelines

1. Follow the TypeScript and ESLint configurations
2. Use the provided UI components from the `components/ui` directory
3. Follow the API integration patterns in the `services` directory
4. Add proper error handling and loading states
5. Write meaningful commit messages

## API Integration

The frontend communicates with the backend API running on `http://localhost:3001/api/v1`. See the [API Documentation](./FRONTEND_INTEGRATION.md) for details about available endpoints and data structures.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 