import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "@/app/actions/auth/loginUser";
import { signIn } from "next-auth/react";
import dbConnect, { collectionNamesObj } from "./dbConnect";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // Credentials provider (for email/password login)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Call your custom login function (replace with your logic)
          const user = await loginUser(credentials);

          if (user) {
            // Return user object, make sure it includes the necessary fields like id, email, role, etc.
            return {
              id: user._id,
              email: user.email,
              name: user.name,
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Login error:", error.message);
          return null;
        }
      },
    }),

    // Google provider for OAuth login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // Define the pages for sign in, error, etc.
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email: user_email, image, name } = user;
        const userCollection = dbConnect(collectionNamesObj.userCollection);
        const isExisted = await userCollection.findOne({ providerAccountId });
        if (!isExisted) {
          const payload = {
            providerAccountId,
            provider,
            email: user_email,
            image,
            name,
          };
          await userCollection.insertOne(payload);
        }
      }
      return true;
    },

    // Handle the JWT token creation and updates
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    // Handle the session data (used to pass user information to the client)
    async session({ session, token }) {
      console.log(token);
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;

      return session;
    },
  },

  // Set the secret to secure cookies and JWT tokens
  secret: process.env.NEXTAUTH_SECRET, // Use the secret from environment variables

  // Session management options
  session: {
    strategy: "jwt", // Use JWT for session management
  },

  // JWT options
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // JWT token expiration (30 days)
    updateAge: 60 * 60 * 24, // JWT token update interval (1 day)
  },
};
