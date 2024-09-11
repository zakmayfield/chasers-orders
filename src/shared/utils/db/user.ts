'use server';
import { db } from '@/lib/prisma';
import { SignUpFormData } from '@/shared/types/Forms';
import {
  TBilling,
  TCompanyWithAddress,
  TContact,
  TFullUser,
  TShipping,
  TUser,
  TUserAuthorization,
  TUserExtendedAuthorization,
  TVerificationToken,
} from '@/shared/types/User';
import { JWT } from 'next-auth/jwt';
import { BASE_URL } from '../constants';

//^ POST
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

//^ PUT
type TUpdateExpiredVerificationToken = (props: {
  user_id: string;
  new_token: string;
  expires_on: Date;
}) => Promise<TVerificationToken>;
export const updateExpiredVerificationToken: TUpdateExpiredVerificationToken =
  async ({ user_id, new_token, expires_on }) => {
    const verificationToken = await db.verificationToken.update({
      where: { user_id },
      data: {
        token: new_token,
        expires: expires_on,
      },
    });
    return verificationToken;
  };

type TVerifyUserEmail = (props: {
  user_id: string;
  identifier: string;
}) => Promise<TUser>;
export const verifyUserEmail: TVerifyUserEmail = async ({
  user_id,
  identifier,
}) => {
  const user = await db.user.update({
    where: { id: user_id },
    data: {
      email_verified_on: new Date().toISOString(),
      verification_token: {
        update: {
          where: { identifier },
          data: {
            is_valid: false,
          },
        },
      },
    },
  });
  return user;
};

type TUpdateDeliveryInstructions = (props: {
  company_id: string;
  deliveryInstructions: string;
}) => Promise<TShipping>;
export const updateDeliveryInstructions: TUpdateDeliveryInstructions = async ({
  company_id,
  deliveryInstructions,
}) => {
  const updateInstructions = await db.shipping.update({
    where: { company_id },
    data: {
      deliveryInstructions,
    },
  });

  return updateInstructions;
};

//^ GET
type TGetUserByEmail = (props: {
  email: TUser['email'];
  fullUser?: boolean;
}) => Promise<TUser | TFullUser | null>;
export const getUserByEmail: TGetUserByEmail = async ({
  email,
  fullUser = false,
}) => {
  const user = await db.user.findUnique({
    where: { email },
    include: fullUser
      ? {
          contact: true,
          company: true,
          cart: true,
          favorites: true,
          orders: true,
        }
      : {},
  });
  return user;
};

type TGetContactByUserId = (props: {
  user_id: string;
}) => Promise<TContact | null>;
export const getContactByUserId: TGetContactByUserId = async ({ user_id }) => {
  const contact = await db.contact.findUnique({
    where: { user_id },
  });
  return contact;
};

type TGetCompanyByUserId = (props: {
  user_id: string;
}) => Promise<TCompanyWithAddress | null>;
export const getCompanyByUserId: TGetCompanyByUserId = async ({ user_id }) => {
  const company = await db.company.findUnique({
    where: { user_id },
    include: {
      shipping: true,
      billing: true,
    },
  });
  return company;
};

type TGetShippingByCompanyId = (props: {
  company_id: string;
}) => Promise<TShipping | null>;
export const getShippingByCompanyId: TGetShippingByCompanyId = async ({
  company_id,
}) => {
  const shipping = await db.shipping.findUnique({
    where: { company_id },
  });
  return shipping;
};

type TGetBillingByCompanyId = (props: {
  company_id: string;
}) => Promise<TBilling | null>;
export const getBillingByCompanyId: TGetBillingByCompanyId = async ({
  company_id,
}) => {
  const billing = await db.billing.findUnique({
    where: { company_id },
  });
  return billing;
};

type TGetUserAuthorizationByEmail = (props: {
  email: TUser['email'];
}) => Promise<TUserExtendedAuthorization | null>;
export const getUserAuthorizationByEmail: TGetUserAuthorizationByEmail =
  async ({ email }) => {
    const userAuthorization = await db.user.findUnique({
      where: { email },
      select: {
        email: true,
        email_verified_on: true,
        is_approved: true,
        role: true,
        permissions: true,
      },
    });
    return userAuthorization;
  };

//^ MIDDLEWARE AUTHORIZATION
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
