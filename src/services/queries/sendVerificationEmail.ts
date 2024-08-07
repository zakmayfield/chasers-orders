import { SendEmailAPIResponse } from '@/types/email';
import { fetchHandler } from '@/utils/fetch';

export const sendVerificationEmail = async (): Promise<SendEmailAPIResponse> =>
  await fetchHandler({
    route: '/verify/send',
  });
