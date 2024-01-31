import { User } from '@prisma/client';
import { db } from './db.prisma-client';
import { SignUpFormData } from '@/types/types.auth-forms';

// Get secure user

type UniqueSecureUser = {
  (email: string): Promise<SecureUser | null>;
};

type SecureUser = Omit<User, 'password' | 'image'>;

export const findUniqueSecureUser: UniqueSecureUser = async (email) =>
  await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      isApproved: true,
      emailVerified: true,
    },
  });

// Register user

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
    },
  });
};
