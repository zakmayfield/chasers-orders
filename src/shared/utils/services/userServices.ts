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
import { PasswordFormData } from '@/shared/types/Forms';

const endpoint = Endpoints.user;

export const userServices = {
  getUser: async ({
    fullUser,
  }: {
    fullUser?: boolean;
  }): Promise<TUser | TFullUser> =>
    await fetchHandler({
      route: endpoint + `${fullUser ? '?full=true' : ''}`,
    }),

  getContactByUserId: async (): Promise<TContact> =>
    await fetchHandler({
      route: `${endpoint}/contact`,
    }),

  getCompanyByUserId: async ({
    hasAddress,
  }: {
    hasAddress?: boolean;
  }): Promise<TCompany | TCompanyWithAddress> =>
    await fetchHandler({
      route: `${endpoint}/company` + `${hasAddress ? '?address=true' : ''}`,
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

  changePassword: async (values: PasswordFormData): Promise<string> =>
    await fetchHandler({
      route: endpoint + '/password',
      options: {
        config: {
          method: 'PUT',
          body: JSON.stringify(values),
        },
      },
    }),
};
