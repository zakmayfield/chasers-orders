'use server';
import { db } from '@/lib/prisma';
import { SignUpFormData } from '@/shared/types/Forms';
import { TUser, TUserAuthorization } from '@/shared/types/User';
import { JWT } from 'next-auth/jwt';
import { BASE_URL } from '../constants';

//^ USER DATA
type TGetUserByEmail = (props: {
  email: TUser['email'];
}) => Promise<TUser | null>;

export const getUserByEmail: TGetUserByEmail = async ({ email }) => {
  const user = await db.user.findUnique({
    where: { email },
  });
  return user;
};

//^ AUTHORIZATION
type TGetUserAuth = (props: {
  token: JWT;
}) => Promise<TUserAuthorization | null>;

export const getUserAuth: TGetUserAuth = async ({ token }) => {
  if (!token.is_approved || !token.email_verified_on) {
    const apiUrl = new URL(`/api/auth/user?userId=${token.id}`, BASE_URL);

    try {
      const response = await fetch(apiUrl);
      const { is_approved, email_verified_on } = await response.json();

      return {
        is_approved,
        email_verified_on,
      };
    } catch (error) {
      console.error(error);
    }
  }

  return {
    is_approved: token.is_approved,
    email_verified_on: token.email_verified_on,
  };
};

//^ CREATE
type TRegisterUser = (props: {
  credentials: SignUpFormData;
  hashedPassword: string;
  verificationToken: string;
  expires: Date;
}) => Promise<TUser>;

export const registerUser: TRegisterUser = async ({
  credentials,
  hashedPassword,
  verificationToken,
  expires,
}) => {
  const registeredUser = await db.user.create({
    data: {
      email: credentials.email,
      password: hashedPassword,
      verification_token: {
        create: {
          identifier: `email-verification-${credentials.email}`,
          token: verificationToken,
          expires: expires,
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
          shipping: {
            create: {
              streetAddress: credentials.shippingStreetAddress,
              unit: credentials.shippingUnit,
              city: credentials.shippingCity,
              state: credentials.shippingState,
              postalCode: credentials.shippingPostalCode,
              deliveryInstructions: credentials.deliveryInstructions,
            },
          },
          billing: {
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
  });

  return registeredUser;
};
