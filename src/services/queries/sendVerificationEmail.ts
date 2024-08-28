import { TSendVerificationEmailResponse } from '@/shared/types/API';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const sendVerificationEmail =
  async (): Promise<TSendVerificationEmailResponse> =>
    await fetchHandler({
      route: '/verification/send',
    });
