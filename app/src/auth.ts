import NextAuth from "next-auth";
import Authentik from "next-auth/providers/authentik";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Authentik({
      clientId: process.env.AUTH_AUTHENTIK_ID,
      clientSecret: process.env.AUTH_AUTHENTIK_SECRET,
      issuer: process.env.AUTH_AUTHENTIK_ISSUER,
    }),
  ],
  callbacks: {
    // Pull the groups claim from Authentik's ID token onto the JWT
    async jwt({ token, profile }) {
      if (profile) {
        token.roles = (profile as { groups?: string[] }).groups ?? [];
      }
      return token;
    },
    // Expose roles on the session object used by server components
    async session({ session, token }) {
      session.user.roles = (token.roles as string[]) ?? [];
      return session;
    },
  },
});