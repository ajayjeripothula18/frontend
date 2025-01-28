import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(credentials),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Authentication failed');
          }

          return {
            id: data.userId,
            email: data.email,
            name: data.name,
            role: data.roleId === 1 ? 'ADMIN' : 'USER',
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expires: new Date(data.expires_at).getTime()
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expires = user.expires;
        token.role = user.role;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.expires) {
        return token;
      }

      // Access token has expired, try to refresh it
      try {
        const response = await fetch(`${API_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: token.refreshToken,
          }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error('RefreshAccessTokenError');

        return {
          ...token,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expires: new Date(data.expires_at).getTime(),
        };
      } catch (error) {
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expires = token.expires;
      session.error = token.error;
      session.user.role = token.role;

      return session;
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
};