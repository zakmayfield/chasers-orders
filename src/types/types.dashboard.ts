import {
  User,
  Contact,
  Order,
  Company,
  ShippingAddress,
  BillingAddress,
  Favorite,
} from '@prisma/client';

export type DashboardUserData = DashboardUser & {
  contact: DashboardContact;
  favorites: DashboardFavorite[];
  orders: DashboardOrder[];
  company: DashboardCompany;
};

export type DashboardFetchState<T> = T | DashboardQueryError | null;

export type DashboardQueryError = {
  error: string;
};

export type DashboardUser = Omit<User, 'password' | 'image'>;
export type DashboardContact = Omit<Contact, 'userId'>;
export type DashboardOrder = Omit<Order, 'userId'>;
export type DashboardFavorite = Omit<Favorite, 'userId'>;
export type DashboardCompany = CompanyType & {
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
};
type CompanyType = Omit<Company, 'userId'>;
