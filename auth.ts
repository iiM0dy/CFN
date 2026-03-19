import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { stripe } from "@/lib/stripe"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: { email }
          });

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    }),
    Credentials({
      id: "guest_email_login",
      name: "Guest Email Login",
      credentials: {
        email: { type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        let user = await prisma.user.findUnique({ where: { email: credentials.email as string } });
        if (user && user.password !== null) {
            throw new Error("This email has an account. Please log in before proceeding.");
        }
        
        if (!user) {
            user = await prisma.user.create({
                data: { email: credentials.email as string, password: null }
            });
        }
        return user;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        // @ts-ignore
        session.user.role = token.role;
      }

      if (token.hasPassword !== undefined && session.user) {
        // @ts-ignore
        session.user.hasPassword = token.hasPassword;
      }

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        // @ts-ignore
        token.role = user.role;
        // @ts-ignore
        token.hasPassword = (user as any).password !== null && (user as any).password !== undefined;
      }

      // Allow updating session
      if (trigger === "update" && session?.hasPassword !== undefined) {
        token.hasPassword = session.hasPassword;
      }

      // If missing hasPassword entirely for existing token, fetch it
      if (token.hasPassword === undefined && token.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email as string }, select: { password: true } });
        token.hasPassword = dbUser?.password !== null;
      }

      return token;
    },
  },
})
