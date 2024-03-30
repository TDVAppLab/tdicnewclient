import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import type { Adapter, AdapterUser } from 'next-auth/adapters'
import GithubProvider from 'next-auth/providers/github'

import prisma from '@/server/prisma'

type ClientType = {
  clientId: string
  clientSecret: string
}
/*
export const prismaAdapter: Adapter = {
  ...PrismaAdapter(prisma),
  createUser: async (data) => {
    const user = await prisma.user.create({ data: { ...data, email: null } })
    return user as AdapterUser
  },
  getUserByEmail: () => null,
}*/

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    } as ClientType),
  ],
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  //adapter: prismaAdapter,
  callbacks: {
    async jwt({ token, account, user }) {
      //console.log('user', user)
      if (account) {
        token.accessToken = account?.access_token
      }
      if (user) {
        token.userId = user.id
        token.emailVerified = (user as AdapterUser).emailVerified
      }
      return token
    },
    async session({ session, token, user }) {
      //console.log('user', user)
      session.user.accessToken = token.accessToken
      session.user.id = token.userId
      session.user.emailVerified = token.emailVerified
      return session
    },
  },
}

export default NextAuth(nextAuthOptions)
