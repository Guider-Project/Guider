import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
  {
    id: 1,
    name: "J Smith",
    email: "test@email.com",
    password: "password",
  },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@email.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("credentials", credentials);
        const user = users.find(
          (user) => user.email === credentials.email && user.password === credentials.password,
        );
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
