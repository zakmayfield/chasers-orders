import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  AuthSignInValidator,
  AuthSignUpValidator,
} from '@/shared/validators/auth';
import {
  extractExpiration,
  generateVerificationToken,
} from '@/shared/utils/helpers';
import { db } from '@/lib/prisma';
import { createCart } from '@/shared/utils/db/cart';
import { getUserByEmail, registerUser } from '@/shared/utils/db/user';
import { sendEmail } from '@/shared/utils/email/sendEmail';

//^ adapter
type NextAuthAdapter = NextAuthOptions['adapter'];
const adapter: NextAuthAdapter = PrismaAdapter(db);

//^ strategy
type NextAuthSessionStrategy = NextAuthOptions['session'];
const session: NextAuthSessionStrategy = {
  strategy: 'jwt',
};

//^ pages
type NextAuthPages = NextAuthOptions['pages'];
const pages: NextAuthPages = {
  signIn: '/',
  error: '/error',
};

//^ providers
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

      // compare passwords
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid credentials.');
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
      // parse credentials
      const parsedCreds = AuthSignUpValidator.safeParse(credentials);

      if (!parsedCreds.success) {
        throw new Error(parsedCreds.error.message);
      }

      const {
        data: { email, password },
      } = parsedCreds;

      // throw if a user exists with desired email
      const existingUser = await db.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (existingUser) {
        throw new Error(
          'This email is already in use. Please log in to continue.'
        );
      }

      // generate email verification token
      const verificationToken = generateVerificationToken(email);

      // extract expiration
      const tokenExpiration = extractExpiration(verificationToken);

      const expires = new Date(tokenExpiration * 1000);

      // salt/hash password
      const salt = await genSalt(12);
      const hashedPassword = await hash(password, salt);

      const user = await registerUser({
        credentials: parsedCreds.data,
        hashedPassword,
        verificationToken,
        expires,
      });

      if (!user) {
        throw new Error('Error creating account');
      }

      // initialize cart record with user data
      await createCart({ user_id: user.id });

      // send verification email
      await sendEmail({
        type: 'verification',
        to: email,
        verificationToken,
      })
        .then((response) => response)
        .catch((error) => error);

      return user;
    },
  }),
];

//^ callbacks
type NextAuthCallbacks = NextAuthOptions['callbacks'];
const callbacks: NextAuthCallbacks = {
  async session({ token, session }) {
    if (token) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.is_approved = token.is_approved;
      session.user.email_verified_on = token.email_verified_on;
    }

    return session;
  },

  async jwt({ token, user }) {
    const dbUser = await getUserByEmail({ email: token.email! });

    if (!dbUser) {
      token.id = user!.id;
      return token;
    }

    return {
      id: dbUser.id,
      email: dbUser.email,
      is_approved: dbUser.is_approved,
      email_verified_on: dbUser.email_verified_on,
    };
  },

  redirect() {
    return '/';
  },
};

//^ config
export const authConfig = {
  adapter,
  session,
  pages,
  providers,
  callbacks,
} satisfies NextAuthOptions;
