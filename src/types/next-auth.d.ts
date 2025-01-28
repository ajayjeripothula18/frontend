import 'next-auth';
import { JWT as NextAuthJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string;
    expires: number;
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    }
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    accessToken: string;
    refreshToken: string;
    expires: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    accessToken: string;
    refreshToken: string;
    expires: number;
    role: UserRole;
  }
}

type UserRole = 'ADMIN' | 'AGENT' | 'MANAGER'; 