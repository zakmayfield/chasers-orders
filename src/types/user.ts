import { DeliveryInstructionsValidator } from '@/shared/validators/cart/DeliveryInstructionsValidator';
import { CompanyValidator } from '@/shared/validators/user/CompanyValidator';
import {
  User,
  Contact,
  Order,
  Company,
  ShippingAddress,
  BillingAddress,
  Favorite,
} from '@prisma/client';
import { z } from 'zod';

export type SecureUser = Omit<User, 'password'>;

export type UserData = SecureUser & {
  contact: Contact;
  favorites: Favorite[];
  orders: Order[];
  company: Company & {
    shippingAddress: ShippingAddress;
    billingAddress: BillingAddress;
  };
};

export type ShippingData = {
  companyName?: string;
  shippingAddress: ShippingAddress | null;
};

export type DeliveryInstructionsData = z.infer<
  typeof DeliveryInstructionsValidator
>;

export type CompanyFormData = z.infer<typeof CompanyValidator>;

type AdjustedContactForm = z.ZodObject<
  {
    name: z.ZodString;
    position: z.ZodString;
    phoneNumber: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    name: string;
    position: string | null;
    phoneNumber: string;
  },
  {
    name: string;
    position: string | null;
    phoneNumber: string;
  }
>;
export type ContactFormData = z.infer<AdjustedContactForm>;
