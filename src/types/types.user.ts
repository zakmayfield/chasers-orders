import {
  User,
  Contact,
  Order,
  Company,
  ShippingAddress,
  BillingAddress,
} from '@prisma/client';

export type DashboardUserData = PartialUser & {
  contact: PartialContact;
  orders: PartialOrders[];
  company: ExtendedCompany;
};

type PartialUser = Pick<User, 'id' | 'isApproved' | 'emailVerified'>;
type PartialContact = Omit<Contact, 'userId'>;
type PartialOrders = Omit<Order, 'userId'>;
type PartialCompany = Omit<Company, 'userId'>;

type ExtendedCompany = PartialCompany & {
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
};
