import {
  Billing,
  Company,
  Contact,
  Permission,
  Role,
  Shipping,
  User,
  UserPermission,
  VerificationToken,
} from '@prisma/client';
import { TOrder } from './Order';
import { TCart } from './Cart';
import { TFavorite } from './Favorite';

//^ USER
export type TUser = Omit<User, 'password'>;
export type TContact = Contact;
export type TCompany = Company;
export type TShipping = Shipping;
export type TBilling = Billing;

export type TFullUser = TUser & {
  contact: TContact | null;
  company: TCompany | null;
  cart: TCart | null;
  favorites: TFavorite[];
  orders: TOrder[];
};

export type TCompanyWithAddress = TCompany & {
  shipping: TShipping | null;
  billing: TBilling | null;
};

//^ AUTHORIZATION
export type TRole = Role;
export type TPermission = Permission;
export type TUserPermission = UserPermission;
export type TUserAuthorization = Pick<
  TUser,
  'is_approved' | 'email_verified_on'
>;
export type TUserExtendedAuthorization = Pick<
  TUser,
  'is_approved' | 'email_verified_on' | 'email'
> & {
  role: TRole;
  permissions: TUserPermission[];
};

//^ VERIFICATION
export type TVerificationToken = VerificationToken;

export type TUpdateVerificationResponse = {
  email: string;
  email_verified_on: Date | null;
};
