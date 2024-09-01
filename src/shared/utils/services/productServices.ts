import { fetchHandler } from '@/shared/utils/api/fetch';
import { Endpoints } from '@/shared/types/API';
import {
  TProductVariant,
  TProductVariantWithProduct,
  TProductWithCategory,
  TProductWithVariants,
} from '@/shared/types/Product';

const product = Endpoints.product;
const products = Endpoints.products;

export const productServices = {
  getProducts: async ({
    hasVariants,
    take,
  }: {
    hasVariants?: boolean;
    take?: number;
  }): Promise<TProductWithCategory[] | TProductWithVariants[]> =>
    await fetchHandler({
      route:
        products +
        `${hasVariants ? '?variants=true' : ''}` +
        `${take ? `?take=${take}` : ''}`,
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
        products +
        `/variant/${product_variant_id}` +
        `${hasProduct ? '?product=true' : ''}`,
    }),
};
