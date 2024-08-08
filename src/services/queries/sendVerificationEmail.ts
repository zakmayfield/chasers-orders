import { SendVerificationEmailResponse } from '@/types/email';
import { fetchHandler } from '@/utils/fetch';

export const sendVerificationEmail =
  async (): Promise<SendVerificationEmailResponse> =>
    await fetchHandler({
      route: '/verify/send',
    });
