import NextAuth from "next-auth";
import type { DefaultSession } from "@auth/core/types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';  
import { prisma } from "database";

import { env } from "./env.mjs"

export type { Session } from "next-auth";

// Update this whenever adding new providers so that the client can
export const providers = ["discord", "google", "github", "facebook", "credentials"] as const;
export type OAuthProviders = (typeof providers)[number];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}


async function findUserByCredentials(email: string, password: string){
  const user = await prisma.user.findUnique({
    where: { email: email},
  });
  if (user) {
    if (user.hashedPassword && await bcrypt.compare(password, user.hashedPassword)) {
      return user;
    } else {
      throw new Error('Invalid password.');
    }
  } else {
    throw new Error('User does not exist. Please sign up.');
  }
}

export const {  
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "dungenmaster@gmail.com" },
        hashedPassword: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return Promise.resolve(null);
        }
        try {
          const userExist = await findUserByCredentials(credentials.email, credentials.hashedPassword);
          return Promise.resolve(userExist);
        } catch (error) {
          throw error;
        }
      }
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true }
      })
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: dbUser?.role
        },
      };
    },
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      
      return token;
    },
  },
});

