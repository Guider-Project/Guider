import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";

import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;

        if (email && password) {
          await dbConnect();

          const users = await User.find({ email: email.toLowerCase() });
          const user = users[0];
          if (!user) return null;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  jwt: {
    encode: ({ secret, token }) => {
      return jsonwebtoken.sign(
        {
          ...token,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret,
      );
    },
    decode: ({ secret, token }) => {
      return jsonwebtoken.verify(token, secret);
    },
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/signup",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
