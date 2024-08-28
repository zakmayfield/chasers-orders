import { QueryKeys } from '@/shared/types/Cache';
import { useCustomQuery } from '../../custom';
import { productServices } from '@/shared/utils/services/productServices';

export const useGetAllProducts = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: productServices.getAllProducts,
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useGetAllProductsWithVariants = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: productServices.getAllProductsWithVariants,
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useGetProductById = ({ product_id }: { product_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.PRODUCT, product_id],
    queryFn: async () => await productServices.getProductById({ product_id }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useGetProductVariants = ({
  product_id,
}: {
  product_id: string;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.VARIANTS, product_id],
    queryFn: async () =>
      await productServices.getProductVariants({ product_id }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useGetProductVariantById = ({
  product_variant_id,
}: {
  product_variant_id: string;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.VARIANT, product_variant_id],
    queryFn: async () =>
      await productServices.getProductVariantById({ product_variant_id }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};
