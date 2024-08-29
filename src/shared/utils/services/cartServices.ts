import { fetchHandler } from '@/shared/utils/api/fetch';
import { Endpoints, TBatchPayload } from '@/shared/types/API';
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

  createCart: async (): Promise<TCartItem> =>
    await fetchHandler({
      route: endpoint + `/items`,
      options: {
        config: {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
        },
      },
    }),

  getCartItems: async (): Promise<TCartItem[]> =>
    await fetchHandler({
      route: endpoint + `/items`,
    }),

  createCartItem: async ({
    product_variant_id,
  }: {
    product_variant_id: string;
  }): Promise<TCartItem> =>
    await fetchHandler({
      route: endpoint + `/items`,
      options: {
        config: {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(product_variant_id),
        },
      },
    }),

  deleteCartItem: async ({
    product_variant_id,
  }: {
    product_variant_id: string;
  }): Promise<TCartItem> =>
    await fetchHandler({
      route: endpoint + `/items`,
      options: {
        config: {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(product_variant_id),
        },
      },
    }),

  emptyCart: async (): Promise<TBatchPayload> =>
    await fetchHandler({
      route: endpoint + `/items?empty=true`,
      options: {
        config: {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(null),
        },
      },
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
