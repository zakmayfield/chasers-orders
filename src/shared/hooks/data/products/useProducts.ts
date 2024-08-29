import { QueryKeys } from '@/shared/types/Cache';
import { useCustomQuery } from '../../custom';
import { productServices } from '@/shared/utils/services/productServices';

export const useGetAllProducts = ({
  hasVariants,
}: {
  hasVariants?: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [
      hasVariants ? QueryKeys.PRODUCTS_WITH_VARIANTS : QueryKeys.PRODUCTS,
    ],
    queryFn: async () => await productServices.getProducts({ hasVariants }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useGetProduct = ({
  product_id,
  hasVariants,
}: {
  product_id: string;
  hasVariants?: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.PRODUCT, product_id],
    queryFn: async () =>
      await productServices.getProduct({ product_id, hasVariants }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useGetProductVariant = ({
  product_variant_id,
  hasProduct,
}: {
  product_variant_id: string;
  hasProduct?: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.VARIANT, product_variant_id],
    queryFn: async () =>
      await productServices.getProductVariant({
        product_variant_id,
        hasProduct,
      }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};
