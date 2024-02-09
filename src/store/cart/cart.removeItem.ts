import { UnitsOnCart } from '@prisma/client';
import { RemoveCartItemProps } from '@/features/cart/ui/RemoveCartItemButton';

type RemoveCartItemStore = {
  (payload: RemoveCartItemProps['payload']): Promise<DeletedItemID>;
};

type DeletedItemID = Pick<UnitsOnCart, 'unitId'>;

/**
 * Remove cart item - Mutation function
 * @param payload
 * @param {string} payload.unitId
 * @param {string} payload.cartId
 * @returns Resolved promise with { unitId }
 */

export const removeItem: RemoveCartItemStore = async (payload) => {
  const body = JSON.stringify(payload);

  try {
    const response = await fetch('/api/cart/item/remove', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
