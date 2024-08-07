import { DeliveryInstructionsResponse } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const updateDeliveryInstructions = async (payload: {
  deliveryInstructions: string;
}): Promise<DeliveryInstructionsResponse> =>
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
