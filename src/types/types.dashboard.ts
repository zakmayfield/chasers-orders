import {
  User,
  Contact,
  Order,
  Company,
  ShippingAddress,
  BillingAddress,
} from '@prisma/client';

export type DashboardUserData = DashboardUser & {
  contact: DashboardContact;
  orders: DashboardOrder[];
  company: DashboardCompany;
};

export type DashboardUser = Pick<
  User,
  'id' | 'email' | 'isApproved' | 'emailVerified'
>;
export type DashboardContact = Omit<Contact, 'userId'>;
export type DashboardOrder = Omit<Order, 'userId'>;
export type DashboardCompany = CompanyType & {
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
};
type CompanyType = Omit<Company, 'userId'>;

export type DashboardQueryError = {
  error: string;
};
