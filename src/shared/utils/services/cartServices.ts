import { fetchHandler } from '@/shared/utils/api/fetch';
import { Endpoints } from '@/shared/types/API';
import {
  TCartItem,
  TCartWithItemsAndProductVariants,
} from '@/shared/types/Cart';

const endpoint = Endpoints.cart;

export const cartServices = {
  getCart: async (): Promise<TCartWithItemsAndProductVariants> =>
    await fetchHandler({
      route: endpoint,
    }),

  getCartItems: async (): Promise<TCartItem[]> =>
    await fetchHandler({
      route: endpoint + `/items`,
    }),

  getCartItem: async ({
    product_variant_id,
  }: {
    product_variant_id: string;
  }): Promise<TCartItem> =>
    await fetchHandler({
      route: endpoint + `/item/${product_variant_id}`,
    }),
};
