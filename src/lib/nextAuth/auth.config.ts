import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { db } from '../db';
import {
  AuthSignInValidator,
  AuthSignUpValidator,
} from '../validators/user-auth';
import { createCart } from '@/utils/dbHelpers';
import { sendVerificationEmail } from '@/utils/emailHelpers';
import { generateVerificationToken, verifyToken } from '@/utils/authHelpers';

// adapter
type NextAuthAdapter = NextAuthOptions['adapter'];
const adapter: NextAuthAdapter = PrismaAdapter(db);

// strategy
type NextAuthSessionStrategy = NextAuthOptions['session'];
const session: NextAuthSessionStrategy = {
  strategy: 'jwt',
};

// pages
type NextAuthPages = NextAuthOptions['pages'];
const pages: NextAuthPages = {
  signIn: '/sign-in',
  error: '/error',
};

// providers
type NextAuthProviders = NextAuthOptions['providers'];
const providers: NextAuthProviders = [
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
      const parsedCreds = AuthSignInValidator.safeParse(credentials);

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
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const parsedCreds = AuthSignUpValidator.safeParse(credentials);

      // parsed credentials guard
      if (!parsedCreds.success) {
        throw new Error(parsedCreds.error.message);
      }

      const {
        data: {
          email,
          password,
          contactName,
          contactPosition,
          contactPhoneNumber,
          companyName,
          accountPayableEmail,
          paymentMethod,
          shippingStreetAddress,
          shippingUnit,
          shippingCity,
          shippingState,
          shippingPostalCode,
          deliveryInstructions,
          billingStreetAddress,
          billingUnit,
          billingCity,
          billingState,
          billingPostalCode,
        },
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
        verifiedAndDecodedToken = verifyToken(verificationToken) as JwtPayload;
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
          contact: {
            create: {
              name: contactName,
              position: contactPosition,
              phoneNumber: contactPhoneNumber,
            },
          },
          company: {
            create: {
              name: companyName,
              accountPayableEmail,
              paymentMethod,
              shippingAddress: {
                create: {
                  streetAddress: shippingStreetAddress,
                  unit: shippingUnit,
                  city: shippingCity,
                  state: shippingState,
                  postalCode: shippingPostalCode,
                  deliveryInstructions,
                },
              },
              billingAddress: {
                create: {
                  streetAddress: billingStreetAddress,
                  unit: billingUnit,
                  city: billingCity,
                  state: billingState,
                  postalCode: billingPostalCode,
                },
              },
            },
          },
        },
      });

      if (!user) {
        throw new Error('Error creating account');
      }

      await createCart(user.id);

      // send verification email
      // consider async w/ error handling
      sendVerificationEmail(verificationToken, email);

      return user;
    },
  }),
];

// callbacks
type NextAuthCallbacks = NextAuthOptions['callbacks'];
const callbacks: NextAuthCallbacks = {
  async session({ token, session }) {
    if (token) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.isApproved = token.isApproved;
      session.user.emailVerified = token.emailVerified;
    }

    return session;
  },

  async jwt({ token, user }) {
    const dbUser = await db.user.findFirst({
      where: {
        email: token.email!,
      },
      select: {
        id: true,
        email: true,
        isApproved: true,
        emailVerified: true,
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
      emailVerified: dbUser.emailVerified,
    };
  },

  redirect() {
    return '/ ';
  },
};

// config
export const authConfig = {
  adapter,
  session,
  pages,
  providers,
  callbacks,
} satisfies NextAuthOptions;
