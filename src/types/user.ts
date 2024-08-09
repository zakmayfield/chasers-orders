import { DeliveryInstructionsValidator } from '@/shared/validators/cart/DeliveryInstructionsValidator';
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
