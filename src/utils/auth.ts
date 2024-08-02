import { db } from '@/lib/prisma';
import { SignUpFormData } from '@/features/auth/types/index';
import { JWT } from 'next-auth/jwt';
import { BASE_URL } from './constants';
import { SecureUser } from '@/types/user';

/*
  USER ACCOUNT STATUS
*/

interface IUserVerification {
  isApproved: boolean;
  emailVerified: Date | null;
}

type ResolvedVerificationCheck = {
  (token: JWT | null): Promise<IUserVerification>;
};

export const userStatus: ResolvedVerificationCheck = async (token) => {
  if (token && (!token.isApproved || !token.emailVerified)) {
    const apiUrl = new URL(`/api/auth/user?userId=${token.id}`, BASE_URL);

    try {
      const response = await fetch(apiUrl);
      const { isApproved, emailVerified } = await response.json();
      return { isApproved, emailVerified };
    } catch (error) {
      console.error(error);
    }
  }

  return { isApproved: token!.isApproved, emailVerified: token!.emailVerified };
};

/*
  GET SECURE USER
*/

type UniqueSecureUser = {
  (email: string): Promise<SecureUser | null>;
};

export const findUniqueSecureUser: UniqueSecureUser = async (email) =>
  await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      isApproved: true,
      emailVerified: true,
      role: true,
      username: true,
      image: true,
    },
  });

/*
  REGISTER USER
*/

interface IRegisterUser {
  (payload: RegisterUserPayload): Promise<SecureUser | null>;
}

type RegisterUserPayload = {
  credentials: SignUpFormData;
  hashedPassword: string;
  verificationToken: string;
  expires: Date;
};

export const registerUser: IRegisterUser = async (payload) => {
  const { credentials, hashedPassword, verificationToken, expires } = payload;

  return await db.user.create({
    data: {
      email: credentials.email,
      password: hashedPassword,
      verificationToken: {
        create: {
          identifier: `email-verification-${credentials.email}`,
          token: verificationToken,
          expires,
        },
      },
      contact: {
        create: {
          name: credentials.contactName,
          position: credentials.contactPosition,
          phoneNumber: credentials.contactPhoneNumber,
        },
      },
      company: {
        create: {
          name: credentials.companyName,
          accountPayableEmail: credentials.accountPayableEmail,
          paymentMethod: credentials.paymentMethod,
          shippingAddress: {
            create: {
              streetAddress: credentials.shippingStreetAddress,
              unit: credentials.shippingUnit,
              city: credentials.shippingCity,
              state: credentials.shippingState,
              postalCode: credentials.shippingPostalCode,
              deliveryInstructions: credentials.deliveryInstructions,
            },
          },
          billingAddress: {
            create: {
              streetAddress: credentials.billingStreetAddress,
              unit: credentials.billingUnit,
              city: credentials.billingCity,
              state: credentials.billingState,
              postalCode: credentials.billingPostalCode,
            },
          },
        },
      },
    },
    select: {
      id: true,
      email: true,
      isApproved: true,
      emailVerified: true,
      role: true,
      username: true,
      image: true,
    },
  });
};
