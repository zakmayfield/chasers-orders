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

//^ USER
export type TUser = Omit<User, 'password'>;
export type TContact = Contact;
export type TCompany = Company;
export type TShipping = Shipping;
export type TBilling = Billing;

export type TUserWithContact = TUser & {
  contact: TContact;
};
export type TUserWithCompany = TUser & {
  company: TCompany;
};
export type TCompanyWithAddress = TCompany & {
  shipping: TShipping;
  billing: TBilling;
};
export type TFullUserData = TUser & {
  contact: TContact;
  company: TCompanyWithAddress;
};

//^ AUTHORIZATION
export type TRole = Role;
export type TPermission = Permission;
export type TUserPermission = UserPermission;
export type TUserAuthorization = Pick<
  TUser,
  'is_approved' | 'email_verified_on'
> & {
  role: TRole;
  permissions: TUserPermission[];
};

//^ VERIFICATION
export type TVerificationToken = VerificationToken;
