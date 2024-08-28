import { fetchHandler } from '@/shared/utils/api/fetch';
import { TProductVariant, TProductWithCategory } from '@/shared/types/Product';
import { Endpoints } from '@/shared/types/API';

const endpoint = Endpoints.products;

export const productServices = {
  getAllProducts: async (): Promise<TProductWithCategory[]> =>
    await fetchHandler({
      route: endpoint,
    }),

  getProductById: async ({
    product_id,
  }: {
    product_id: string;
  }): Promise<TProductWithCategory> =>
    await fetchHandler({
      route: `${endpoint}/${product_id}`,
    }),

  getProductVariants: async ({
    product_id,
  }: {
    product_id: string;
  }): Promise<TProductVariant[]> =>
    await fetchHandler({
      route: `${endpoint}/variants/${product_id}`,
    }),

  getProductVariantById: async ({
    product_variant_id,
  }: {
    product_variant_id: string;
  }): Promise<TProductVariant> =>
    await fetchHandler({
      route: `${endpoint}/variants/${product_variant_id}`,
    }),
};
