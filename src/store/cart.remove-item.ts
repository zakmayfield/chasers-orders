/*
  TODO: Make er look pretty
    - JSDocumentation
*/

import { UnitsOnCart } from '@prisma/client';
import { RemoveCartItemProps } from '@/features/cart/ui/RemoveCartItemButton';

type RemoveCartItemStore = {
  (payload: RemoveCartItemProps['payload']): Promise<DeletedItemID>;
};

type DeletedItemID = Pick<UnitsOnCart, 'unitId'>;

export const removeCartItem: RemoveCartItemStore = async (payload) => {
  const body = JSON.stringify(payload);

  try {
    const response = await fetch('/api/cart/remove', {
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
