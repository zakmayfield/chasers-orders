import { fetchHandler } from '@/utils/fetch';
import {
  DeliveryInstructionsRequest,
  DeliveryInstructionsResponse,
} from '@/types/cart';

export const updateDeliveryInstructions = async (
  payload: DeliveryInstructionsRequest
): Promise<DeliveryInstructionsResponse> =>
  await fetchHandler({
    route: '/user/company/instructions',
    options: {
      config: {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    },
  });
