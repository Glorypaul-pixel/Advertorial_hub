import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        // Send OAuth user data to your backend
        const res = await fetch(
          "https://advertorial-backend.onrender.com/api/auth/social-login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              provider: account.provider,
              providerId: account.providerAccountId,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        // Store backend token in NextAuth session
        user.backendToken = data.token;
        user.backendId = data.user.id;

        return true;
      } catch (err) {
        console.error("Social login error:", err);
        return false; // Block sign-in on error
      }
    },

    async jwt({ token, user }) {
      if (user?.backendToken) {
        token.backendToken = user.backendToken;
        token.backendId = user.backendId;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.backendToken) {
        session.backendToken = token.backendToken;
        session.backendId = token.backendId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // ✅ Required
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // ✅ Fixes 405 error
