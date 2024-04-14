import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import image from "next/image";

export const dynamic = "force-dynamic";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "*********",
        },
      },

      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          include: {
            image: true,
          },
        });

        if (user) {
          if (!user.emailVerified) {
            throw new Error("Cuenta no verificada");
          }
          const passwordMatches = await bcrypt.compare(
            credentials?.password as string,
            user?.password
          );

          if (passwordMatches) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              role: user.role,
              image: user?.image?.url,
            };
          } else {
            throw new Error("La contraseña es incorrecta");
          }
        } else {
          throw new Error("El usuario no existe");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const data = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        include: {
          image: true,
        },
      });

      token.role = data?.role;
      session.user.role = data?.role;
      session.user.image = data?.image?.url;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
