import { fetchHandler } from '@/shared/utils/api/fetch';
import { Endpoints } from '@/shared/types/API';
import {
  TBilling,
  TCompanyWithAddress,
  TContact,
  TFullUser,
  TShipping,
  TUpdateVerificationResponse,
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

  getCompanyByUserId: async (): Promise<TCompanyWithAddress> =>
    await fetchHandler({
      route: `${endpoint}/company`,
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

  updateInstructions: async ({
    company_id,
    deliveryInstructions,
  }: {
    company_id: string;
    deliveryInstructions: string;
  }): Promise<TShipping> =>
    await fetchHandler({
      route: endpoint + '/company' + `/${company_id}` + '/shipping',
      options: {
        config: {
          method: 'PUT',
          body: JSON.stringify({ deliveryInstructions }),
        },
      },
    }),

  updateVerification: async ({
    token,
  }: {
    token?: string;
  }): Promise<TUpdateVerificationResponse> =>
    await fetchHandler({
      route: '/verification',
      options: {
        config: {
          method: 'PUT',
          body: JSON.stringify({ token }),
        },
      },
    }),
};
