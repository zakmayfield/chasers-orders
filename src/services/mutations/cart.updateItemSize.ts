import { UnitsOnCartCacheType } from '@/types/types.cart';

type UpdateItemSizeProps = {
  (params: {
    cartId: string;
    unitId: string;
    selectedUnitId: string | undefined;
  }): Promise<UnitsOnCartCacheType>;
};

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
