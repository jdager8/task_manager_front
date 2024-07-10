import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { login } from "../../../../services/auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credenditals",
      credentials: {},
      async authorize(credentials: any, req) {
        const { username, password } = credentials;
        const response = await login({ username, password });
        const data = response.data;
        if (response.status === 200) {
          return data;
        }

        return true;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { access_token: accessToken, id } = user as any;
        token.user = {
          accessToken,
          id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const user = token?.user;
      if (session.user) {
        session.user = user as any;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
