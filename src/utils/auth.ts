'use server';
import { db } from '@/lib/prisma';
import { SecureUser } from '@/types/user';
import { getAuthSession } from '@/lib/auth/auth.options';
import { AuthenticateSessionData, RegisterUserParams } from '@/types/auth';

export const authenticateSession = async (): Promise<
  AuthenticateSessionData | Response
> => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new Response('Unauthorized: Please log in to continue.', {
      status: 401,
    });
  }

  const { id, email } = session.user;

  return {
    id,
    email: email!,
  };
};

export const getSecureUser = async (
  email: string
): Promise<SecureUser | null> =>
  await db.user.findUnique({
    where: { email },
    select: {
      user_id: true,
      email: true,
      is_approved: true,
      email_verified_on: true,
      role: true,
      username: true,
      image: true,
    },
  });

export const registerUser = async (
  payload: RegisterUserParams
): Promise<SecureUser | null> =>
  await db.user.create({
    data: {
      email: payload.credentials.email,
      password: payload.hashedPassword,
      verification_token: {
        create: {
          identifier: `email-verification-${payload.credentials.email}`,
          token: payload.verificationToken,
          expires: payload.expires,
        },
      },
      contact: {
        create: {
          name: payload.credentials.contactName,
          position: payload.credentials.contactPosition,
          phoneNumber: payload.credentials.contactPhoneNumber,
        },
      },
      company: {
        create: {
          name: payload.credentials.companyName,
          accountPayableEmail: payload.credentials.accountPayableEmail,
          paymentMethod: payload.credentials.paymentMethod,
          shipping: {
            create: {
              streetAddress: payload.credentials.shippingStreetAddress,
              unit: payload.credentials.shippingUnit,
              city: payload.credentials.shippingCity,
              state: payload.credentials.shippingState,
              postalCode: payload.credentials.shippingPostalCode,
              deliveryInstructions: payload.credentials.deliveryInstructions,
            },
          },
          billing: {
            create: {
              streetAddress: payload.credentials.billingStreetAddress,
              unit: payload.credentials.billingUnit,
              city: payload.credentials.billingCity,
              state: payload.credentials.billingState,
              postalCode: payload.credentials.billingPostalCode,
            },
          },
        },
      },
    },
    select: {
      user_id: true,
      email: true,
      is_approved: true,
      email_verified_on: true,
      role: true,
      username: true,
      image: true,
    },
  });
