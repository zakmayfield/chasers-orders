import { Prisma, UnitsOnCart } from '@prisma/client';
import type {
  CartCache,
  CartItem,
  DeliveryInstructionsResponse,
  UpdateQuantity,
} from '@/types/cart';
import type { OrderType } from '../dashboard/recent-orders/RecentOrders';
import type { RemoveCartItemProps } from './components/items/RemoveCartItemButton';

/*
  ^ ----- MUTATIONS -----
*/

interface AddItemToCartParams {
  (unitId: string): Promise<CartItem>;
}

export const addItem: AddItemToCartParams = async (unitId) => {
  try {
    const response = await fetch('/api/cart/item/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ unitId }),
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

interface OrderAgainProps {
  (order: OrderType): Promise<OrderAgainResponse>;
}

export type OrderAgainResponse = {
  batchPayload: Prisma.BatchPayload;
  cartPayload: CartCache;
};

export const orderAgain: OrderAgainProps = async (order) => {
  try {
    const response = await fetch('/api/cart/order-again', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(order),
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

interface RemoveCartItemStore {
  (payload: RemoveCartItemProps['payload']): Promise<DeletedItemID>;
}

type DeletedItemID = Pick<UnitsOnCart, 'unitId'>;

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

interface UpdateItemQuantityType {
  (params: UpdateQuantity): Promise<CartItem>;
}

export const updateItemQuantity: UpdateItemQuantityType = async (params) => {
  const { cartId, unitId, quantity } = params;

  try {
    const response = await fetch('/api/cart/item/quantity', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ cartId, unitId, quantity: quantity }),
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
