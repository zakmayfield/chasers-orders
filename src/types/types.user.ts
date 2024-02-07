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
  company: ExtendedCompany;
};

type DashboardUser = Pick<User, 'id' | 'isApproved' | 'emailVerified'>;
type DashboardContact = Omit<Contact, 'userId'>;
type DashboardOrder = Omit<Order, 'userId'>;
type DashboardCompany = Omit<Company, 'userId'>;

type ExtendedCompany = DashboardCompany & {
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
};
