import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare, hash, genSalt } from 'bcryptjs';
import { db } from './db';
import { generateVerificationToken, verifyToken } from '@/utils/authHelpers';
import { JwtPayload } from 'jsonwebtoken';
import { sendVerificationEmail } from '@/utils/emailHelpers';
import {
  AuthSignInValidator,
  AuthSignUpValidator,
} from './validators/user-auth';
import { createCart } from '@/utils/dbHelpers';

export const authOptions: NextAuthOptions = {
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
  ],
  callbacks: {
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
  },
};

export const getAuthSession = () => getServerSession(authOptions);
