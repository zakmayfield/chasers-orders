import { VerifyServiceResponse } from '@/types/verification';
import { fetchHandler } from '@/utils/fetch';

export const updateUserVerification = async ({
  token,
}: {
  token?: string;
}): Promise<VerifyServiceResponse> =>
  await fetchHandler({
    route: '/verify',
    options: {
      config: {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ token }),
      },
    },
  });
