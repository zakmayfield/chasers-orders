import { fetchHandler } from '@/utils/fetch';
import {
  UpdateUserVerificationRequest,
  UpdateUserVerificationResponse,
} from '@/types/verification';

export const updateUserVerification = async ({
  token,
}: UpdateUserVerificationRequest): Promise<UpdateUserVerificationResponse> =>
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
