import NextAuth from "next-auth"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import { api } from "@/lib/api"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          try {
            const data = await api("/login", {
              method: "POST",
              body: JSON.stringify({ email, password }),
            });

            if (data?.success && data?.token && data?.user) {
              return {
                ...data.user,
                token: data.token,
              };
            }
          } catch (error) {
            console.error("Laravel Auth Error:", error);
            return null;
          }
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

        try {
          const data = await api("/guest-login", {
            method: "POST",
            body: JSON.stringify({ email: credentials.email as string }),
          });

          if (data?.success && data?.token && data?.user) {
            return {
              ...data.user,
              token: data.token,
            };
          }
        } catch (error: any) {
          console.error("Laravel Guest Auth Error:", error);
          throw new Error(error.message || "Failed to log in as guest.");
        }

        return null;
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

      if (token.createdAt && session.user) {
        // @ts-ignore
        session.user.createdAt = token.createdAt;
      }

      if (token.accessToken && session.user) {
        // @ts-ignore
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        // @ts-ignore
        token.role = user.role;
        // @ts-ignore
        token.hasPassword = (user as any).hasPassword;
        // @ts-ignore
        token.createdAt = (user as any).createdAt;
        // @ts-ignore
        token.accessToken = (user as any).token;
      }

      // Allow updating session
      if (trigger === "update" && session?.hasPassword !== undefined) {
        token.hasPassword = session.hasPassword;
      }

      // If missing hasPassword entirely for existing token, fetch it from Laravel
      if (token.hasPassword === undefined && token.accessToken) {
        try {
          const dbUser = await api("/user", { token: token.accessToken as string });
          if (dbUser) {
            token.hasPassword = dbUser.hasPassword;
            token.createdAt = dbUser.createdAt;
          }
        } catch (e) {
          console.error("Error fetching user in jwt callback:", e);
        }
      }

      return token;
    },
  },
})
