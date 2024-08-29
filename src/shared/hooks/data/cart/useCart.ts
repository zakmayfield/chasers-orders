import { QueryKeys } from '@/shared/types/Cache';
import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { cartServices } from '@/shared/utils/services/cartServices';

export const useGetCart = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART],
    queryFn: cartServices.getCart,
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

export const useCreateCart = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.createCartItem,
  });
  return { mutate, data, isLoading, error };
};

export const useCreateCartItem = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.createCartItem,
  });
  return { mutate, data, isLoading, error };
};

export const useDeleteCartItem = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.deleteCartItem,
  });
  return { mutate, data, isLoading, error };
};

export const useEmptyCart = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.emptyCart,
  });
  return { mutate, data, isLoading, error };
};