import { db } from '@/lib/prisma';
import { SignUpFormData } from '@/shared/types/Forms';
import { TUser } from '@/shared/types/User';

type TGetUser = (props: { email: TUser['email'] }) => Promise<TUser | null>;

export const getUser: TGetUser = async ({ email }) => {
  const user = await db.user.findUnique({
    where: { email },
  });
  return user;
};

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
