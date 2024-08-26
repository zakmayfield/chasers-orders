import { fetchHandler } from '@/utils/fetch';
import {
  TUpdateUserVerificationRequest,
  TUpdateUserVerificationResponse,
} from '@/shared/types/API';

export const updateUserVerification = async ({
  token,
}: TUpdateUserVerificationRequest): Promise<TUpdateUserVerificationResponse> =>
  await fetchHandler({
    route: '/verification',
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
