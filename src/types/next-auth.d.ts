import type { DefaultSession } from 'next-auth'
import { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      accessToken?: string
      emailVerified: Date | null
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    accessToken?: string
    emailVerified: Date | null
  }
}
