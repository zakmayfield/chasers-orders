import { SendVerificationEmailResponse } from '@/types/email';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const sendVerificationEmail =
  async (): Promise<SendVerificationEmailResponse> =>
    await fetchHandler({
      route: '/verification/send',
    });
