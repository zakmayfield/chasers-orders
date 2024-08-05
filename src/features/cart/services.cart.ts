import type { DeliveryInstructionsResponse } from '@/types/cart';

/*
  ^ ----- MUTATIONS -----
*/

interface DeliveryInstructionsMutationProps {
  (payload: {
    deliveryInstructions: string;
  }): Promise<DeliveryInstructionsResponse>;
}

export const deliveryInstructionsMutation: DeliveryInstructionsMutationProps =
  async (payload) => {
    try {
      const response = await fetch(`/api/user/company/instructions`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
