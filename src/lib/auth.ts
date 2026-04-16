import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./db";
import { ENV } from "./env";
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        let email = credentials?.email;
        let password = credentials?.password;
        if (!email || !password)
          throw new Error("Email and password are required");
        await connectDb();
        let existUser = await User.findOne({ email });
        if (!existUser) throw new Error("User not found");
        let isPasswordCorrect = await bcrypt.compare(
          password,
          existUser.password,
        );
        if (!isPasswordCorrect) throw new Error("Invalid credentials");
        return {
          id: existUser._id,
          email: existUser.email,
          name: existUser.name,
          image: existUser.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  pages: {
    signIn:'/login',
    error:'/login'
  },
  secret: ENV.NEXTAUTH_SECRET,
};

export default authOptions;
