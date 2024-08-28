import { QueryKeys } from '@/shared/types/Cache';
import { useCustomQuery } from '../../custom';
import {
  getCartItem,
  getCartItems,
  getCartWithItemsAndProductVariants,
} from '@/shared/utils/db/cart';

export const useGetCart = ({ user_id }: { user_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART],
    queryFn: async () => await getCartWithItemsAndProductVariants({ user_id }),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetCartItems = ({ cart_id }: { cart_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART_ITEMS],
    queryFn: async () => await getCartItems({ cart_id }),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetCartItem = ({
  cart_id,
  product_variant_id,
}: {
  cart_id: string;
  product_variant_id: string;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART_ITEM, product_variant_id],
    queryFn: async () => await getCartItem({ cart_id, product_variant_id }),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};
