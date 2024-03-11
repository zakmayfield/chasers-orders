import { Prisma, Unit, UnitsOnCart } from '@prisma/client';
import type { CartCache2, CartItem } from '@/features/cart/types';
import type { OrderType } from '../dashboard/recent-orders/RecentOrders';
import type { GetShippingPayload } from '@/app/api/user/company/shipping/route';
import type { RemoveCartItemProps } from './components/items/RemoveCartItemButton';

/*
  ^ ----- QUERIES -----
*/

interface GetCartCache2 {
  (): Promise<CartCache2>;
}

export const getCart: GetCartCache2 = async () => {
  try {
    const response = await fetch('/api/cart');

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

interface GetProductUnitSizesProps {
  (unitId: string): Promise<SizesData | undefined>;
}

export type SizesData = {
  id: string;
  product: {
    id: string;
    units: Unit[];
  };
};

export const getItemSizes: GetProductUnitSizesProps = async (unitId) => {
  try {
    const response = await fetch(`/api/cart/item/sizes?unitId=${unitId}`);

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

interface GetShippingProps {
  (): Promise<GetShippingPayload | undefined>;
}

export const getShipping: GetShippingProps = async () => {
  try {
    const response = await fetch('/api/user/company/shipping');

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
    console.error(error);
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
  cartPayload: CartCache2;
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
  (params: {
    cartId: string;
    unitId: string;
    quantityPayload: number;
  }): Promise<CartItem>;
}

export const updateItemQuantity: UpdateItemQuantityType = async (params) => {
  const { cartId, unitId, quantityPayload } = params;

  try {
    const response = await fetch('/api/cart/item/quantity', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ cartId, unitId, quantityPayload }),
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
