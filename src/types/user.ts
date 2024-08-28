import {
  User,
  Contact,
  Order,
  Company,
  ShippingAddress,
  BillingAddress,
  Favorite,
} from '@prisma/client';

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

export type UserAuthorization = {
  id: string;
  email: string;
  isApproved: boolean;
  emailVerified: Date | null;
};

export type ShippingData = {
  companyName: string;
  shippingAddress: ShippingAddress;
};
