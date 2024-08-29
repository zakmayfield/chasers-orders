import { fetchHandler } from '@/shared/utils/api/fetch';
import {
  TProductVariant,
  TProductVariantWithProduct,
  TProductWithCategory,
  TProductWithVariants,
} from '@/shared/types/Product';
import { Endpoints } from '@/shared/types/API';

const product = Endpoints.product;
const products = Endpoints.products;

export const productServices = {
  getProducts: async ({
    hasVariants,
  }: {
    hasVariants?: boolean;
  }): Promise<TProductWithCategory[] | TProductWithVariants[]> =>
    await fetchHandler({
      route: products + `${hasVariants ? '?variants=true' : ''}`,
    }),

  getProduct: async ({
    product_id,
    hasVariants,
  }: {
    product_id: string;
    hasVariants?: boolean;
  }): Promise<TProductWithCategory | TProductWithVariants> =>
    await fetchHandler({
      route:
        product + `/${product_id}` + `${hasVariants ? '?variants=true' : ''}`,
    }),

  getProductVariant: async ({
    product_variant_id,
    hasProduct,
  }: {
    product_variant_id: string;
    hasProduct?: boolean;
  }): Promise<TProductVariant | TProductVariantWithProduct> =>
    await fetchHandler({
      route:
        product +
        `/variant/${product_variant_id}` +
        `${hasProduct ? '?product=true' : ''}`,
    }),
};
