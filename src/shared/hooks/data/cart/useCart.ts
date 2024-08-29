import { QueryKeys } from '@/shared/types/Cache';
import { useCustomQuery } from '../../custom';
import { cartServices } from '@/shared/utils/services/cartServices';

export const useGetCart = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART],
    queryFn: cartServices.getCartWithItemsAndVariants,
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetCartItems = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART_ITEMS],
    queryFn: cartServices.getCartItems,
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetCartItem = ({
  product_variant_id,
}: {
  product_variant_id: string;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART_ITEM, product_variant_id],
    queryFn: async () => await cartServices.getCartItem({ product_variant_id }),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};
