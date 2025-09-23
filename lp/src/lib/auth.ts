import type { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google"

import axios from 'axios';

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // login/signup na service
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
          username: user.name,
          email: user.email,
        });
        user.id = res.data.user._id;
      } catch (e) {
        // fallback: não impede login
      }
      return true;
    },
    async jwt({ token, user }) {
      // Adiciona _id ao token
      if (user && (user as any).id) {
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      // inclui _id na sessão
      if (session.user && token.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
}
