import { SendEmailAPIResponse } from '@/features/verify/utils.verify';
import { fetchHandler } from '@/utils/fetch';

export const sendVerificationEmail = async (): Promise<SendEmailAPIResponse> =>
  await fetchHandler({
    route: '/verify/send',
  });
