import type { CartItem, DeliveryInstructionsResponse } from '@/types/cart';

/*
  ^ ----- MUTATIONS -----
*/

interface UpdateItemSizeProps {
  (params: {
    cartId: string;
    unitId: string;
    selectedUnitId: string | undefined;
  }): Promise<CartItem>;
}

export const updateItemSize: UpdateItemSizeProps = async (params) => {
  const { cartId, unitId, selectedUnitId } = params;
  try {
    const response = await fetch(`/api/cart/item/size`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ cartId, unitId, selectedUnitId }),
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
