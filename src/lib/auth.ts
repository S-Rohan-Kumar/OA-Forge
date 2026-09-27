import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_google_client_secret',
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Guest / Demo Access',
      credentials: {},
      async authorize() {
        return {
          id: 'dev_user_1',
          name: 'Demo Candidate',
          email: 'candidate@oaforge.com',
          image: '',
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'aura_oa_nextauth_secret_key_2026',
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
