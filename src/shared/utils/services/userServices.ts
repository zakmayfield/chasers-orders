import { fetchHandler } from '@/shared/utils/api/fetch';
import { Endpoints } from '@/shared/types/API';
import {
  TBilling,
  TCompany,
  TCompanyWithAddress,
  TContact,
  TFullUser,
  TShipping,
  TUser,
  TUserExtendedAuthorization,
} from '@/shared/types/User';

const endpoint = Endpoints.user;

export const userServices = {
  getUser: async (): Promise<TUser> =>
    await fetchHandler({
      route: endpoint,
    }),

  getFullUser: async (): Promise<TFullUser> =>
    await fetchHandler({
      route: `${endpoint}/full`,
    }),

  getContactByUserId: async (): Promise<TContact> =>
    await fetchHandler({
      route: `${endpoint}/contact`,
    }),

  getCompanyByUserId: async (): Promise<TCompany> =>
    await fetchHandler({
      route: `${endpoint}/company`,
    }),

  getCompanyWithAddressByUserId: async (): Promise<TCompanyWithAddress> =>
    await fetchHandler({
      route: `${endpoint}/company/address`,
    }),

  getShippingByCompanyId: async ({
    company_id,
  }: {
    company_id: string;
  }): Promise<TShipping> =>
    await fetchHandler({
      route: `${endpoint}/company/${company_id}/shipping`,
    }),

  getBillingByCompanyId: async ({
    company_id,
  }: {
    company_id: string;
  }): Promise<TBilling> =>
    await fetchHandler({
      route: `${endpoint}/company/${company_id}/billing`,
    }),

  getUserAuthorizationByEmail: async (): Promise<TUserExtendedAuthorization> =>
    await fetchHandler({
      route: `${endpoint}/authorization`,
    }),
};
