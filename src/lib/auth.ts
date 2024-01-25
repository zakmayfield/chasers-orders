import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare, hash, genSalt } from 'bcryptjs';
import { db } from './db';
import { generateVerificationToken, verifyToken } from '@/utils/authHelpers';
import { JwtPayload } from 'jsonwebtoken';
import { sendVerificationEmail } from '@/utils/emailHelpers';
import { UserAuthValidator } from './validators/user-auth';

export const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'sign-in',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCreds = UserAuthValidator.safeParse(credentials);

        // parsed credentials guard
        if (!parsedCreds.success) {
          throw new Error(parsedCreds.error.message);
        }

        const {
          data: { email, password },
        } = parsedCreds;

        // query user record
        const user = await db.user.findUnique({
          where: { email },
        });

        // null check user/password
        if (!user) {
          return null;
        }
        if (!user.password) {
          throw new Error('Error signing in');
        }

        // compare passwords
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
    CredentialsProvider({
      id: 'sign-up',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCreds = UserAuthValidator.safeParse(credentials);

        // parsed credentials guard
        if (!parsedCreds.success) {
          throw new Error(parsedCreds.error.message);
        }

        const {
          data: { email, password },
        } = parsedCreds;

        // query user record
        const existingUser = await db.user.findUnique({
          where: { email },
        });

        // null check user/password
        if (existingUser) {
          throw new Error('User already exists. Please log in.');
        }

        const verificationToken = generateVerificationToken(email);

        let verifiedAndDecodedToken;

        try {
          verifiedAndDecodedToken = verifyToken(
            verificationToken
          ) as JwtPayload;
        } catch (err) {
          if (err instanceof Error) {
            console.log(err);
          }
        }

        const expires = new Date(verifiedAndDecodedToken?.exp! * 1000);

        // salt/hash password
        const salt = await genSalt(12);
        const hashedPassword = await hash(password, salt);

        const user = await db.user.create({
          data: {
            email,
            password: hashedPassword,
            verificationToken: {
              create: {
                identifier: `email-verification-${email}`,
                token: verificationToken,
                expires,
              },
            },
          },
        });

        if (!user) {
          throw new Error('Error creating account');
        }

        // send verification email
        // consider async w/ error handling
        sendVerificationEmail(verificationToken, email);

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.isApproved = token.isApproved;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        isApproved: dbUser.isApproved,
      };
    },

    redirect() {
      return '/ ';
    },
  },
} satisfies NextAuthOptions;

export const getAuthSession = () => getServerSession(authOptions);
