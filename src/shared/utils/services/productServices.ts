import { fetchHandler } from '@/shared/utils/api/fetch';
import { Endpoints } from '@/shared/types/API';
import {
  TProductVariantWithProduct,
  TProductWithVariants,
} from '@/shared/types/Product';

const product = Endpoints.product;
const products = Endpoints.products;

export const productServices = {
  getProducts: async ({
    take,
  }: {
    take?: number;
  }): Promise<TProductWithVariants[]> =>
    await fetchHandler({
      route: products + `?take=${take ? take : 'false'}`,
    }),

  getProduct: async ({
    product_id,
  }: {
    product_id: string;
  }): Promise<TProductWithVariants> =>
    await fetchHandler({
      route: product + `/${product_id}`,
    }),

  getProductVariant: async ({
    product_variant_id,
  }: {
    product_variant_id: string;
  }): Promise<TProductVariantWithProduct> =>
    await fetchHandler({
      route: products + `/variant/${product_variant_id}`,
    }),
};
