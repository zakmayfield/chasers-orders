import { QueryKeys } from '@/shared/types/Cache';
import { useCustomQuery } from '../../custom';
import { productServices } from '@/shared/utils/services/productServices';

export const useGetProducts = ({ take }: { take?: number }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: async () => await productServices.getProducts({ take }),
    staleTime: Infinity,
  });

  return { products: data, isLoading, error };
};

export const useGetProduct = ({ product_id }: { product_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.PRODUCT, product_id],
    queryFn: () => productServices.getProduct({ product_id }),
    staleTime: Infinity,
  });

  return { product: data, isLoading, error };
};

export const useGetProductVariant = ({
  product_variant_id,
}: {
  product_variant_id: string;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.VARIANT, product_variant_id],
    queryFn: async () =>
      await productServices.getProductVariant({
        product_variant_id,
      }),
    staleTime: Infinity,
  });

  return { productVariant: data, isLoading, error };
};
