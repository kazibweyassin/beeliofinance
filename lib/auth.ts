import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

// Email transporter for magic links
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified ? new Date() : null,
          role: "BORROWER", // Default role for new users
        }
      },
    }),
    
    // Email Magic Links
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || "noreply@beelio.finance",
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const { host } = new URL(url)
        await emailTransporter.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to Beelio Finance`,
          text: `Sign in to Beelio Finance\n\nClick here to sign in: ${url}\n\nIf you didn't request this email, you can safely ignore it.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4F46E5;">Sign in to Beelio Finance</h2>
              <p>Click the button below to sign in to your account:</p>
              <a href="${url}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Sign In</a>
              <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
              <p style="color: #666; font-size: 14px;">If you didn't request this email, you can safely ignore it.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="color: #999; font-size: 12px;">Beelio Finance - Peer-to-Peer Lending Platform</p>
            </div>
          `,
        })
      },
    }),
    
    // Email/Password Credentials
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        // Verify password
        if (!user.password) {
          return null
        }
        
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        
        if (!isPasswordValid) {
          return null
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          phone: user.phone,
          country: user.country,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.phone = (user as any).phone
        token.country = (user as any).country
      }
      
      // Store OAuth provider info
      if (account) {
        token.provider = account.provider
      }
      
      return token 
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string
        ;(session.user as any).role = token.role as string
        ;(session.user as any).phone = token.phone as string
        ;(session.user as any).country = token.country as string
        ;(session.user as any).provider = token.provider as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // For OAuth providers, allow sign-in (role will be selected after)
      return true
    },
    async redirect({ url, baseUrl }) {
      // If redirecting after sign-in
      if (url.startsWith('/') || url.startsWith(baseUrl)) {
        // Check if coming from OAuth callback
        if (url.includes('/api/auth/callback')) {
          // Will check role in middleware or dashboard
          return `${baseUrl}/dashboard`
        }
        return url
      }
      return baseUrl
    },
  },
  pages: {
    signIn: "/auth",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
}
