import { QueryKeys } from '@/shared/types/Cache';
import { useCustomQuery } from '../../custom';
import { productServices } from '@/shared/utils/services/productServices';
import {
  TProductVariant,
  TProductVariantWithProduct,
  TProductWithCategory,
  TProductWithVariants,
} from '@/shared/types/Product';

export const useGetProducts = ({
  hasVariants,
  take,
}: {
  hasVariants?: boolean;
  take?: number;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [
      hasVariants ? QueryKeys.PRODUCTS_WITH_VARIANTS : QueryKeys.PRODUCTS,
    ],
    queryFn: async () =>
      await productServices.getProducts({ hasVariants, take }),
    staleTime: Infinity,
  });

  const dataMap = {
    withVariants: (hasVariants && (data as TProductWithVariants[])) || [],
    withoutVariants: (!hasVariants && (data as TProductWithCategory[])) || [],
  };

  return { products: dataMap, isLoading, error };
};

export const useGetProduct = ({
  product_id,
  hasVariants,
}: {
  product_id: string;
  hasVariants?: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [
      hasVariants ? QueryKeys.PRODUCT_WITH_VARIANTS : QueryKeys.PRODUCT,
      product_id,
    ],
    queryFn: async () =>
      await productServices.getProduct({ product_id, hasVariants }),
    staleTime: Infinity,
  });

  const dataMap = {
    withVariants:
      data && hasVariants ? (data as TProductWithVariants) : undefined,
    withoutVariants:
      data && !hasVariants ? (data as TProductWithCategory) : undefined,
  };

  return { data: dataMap, isLoading, error };
};

export const useGetProductVariant = ({
  product_variant_id,
  hasProduct,
}: {
  product_variant_id: string;
  hasProduct?: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [
      hasProduct ? QueryKeys.VARIANT_WITH_PRODUCT : QueryKeys.VARIANT,
      product_variant_id,
    ],
    queryFn: async () =>
      await productServices.getProductVariant({
        product_variant_id,
        hasProduct,
      }),
    staleTime: Infinity,
  });

  const dataMap = {
    withProduct:
      data && hasProduct ? (data as TProductVariantWithProduct) : undefined,
    withoutProduct: data && !hasProduct ? (data as TProductVariant) : undefined,
  };

  return { data: dataMap, isLoading, error };
};
