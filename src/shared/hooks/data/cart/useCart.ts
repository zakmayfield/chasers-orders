import { QueryKeys } from '@/shared/types/Cache';
import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { cartServices } from '@/shared/utils/services/cartServices';
import { TCartItem, TCartItemWithProductVariant } from '@/shared/types/Cart';

export const useGetCart = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART],
    queryFn: cartServices.getCart,
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetCartItems = ({
  hasProductVariant,
}: {
  hasProductVariant?: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [
      hasProductVariant
        ? QueryKeys.CART_ITEMS_WITH_PRODUCT_VARIANT
        : QueryKeys.CART_ITEMS,
    ],
    queryFn: async () => await cartServices.getCartItems({ hasProductVariant }),
    staleTime: Infinity,
  });

  const dataMap = {
    withProductVariant:
      (hasProductVariant && data && (data as TCartItemWithProductVariant[])) ||
      [],
    withoutProductVariant:
      (!hasProductVariant && data && (data as TCartItem[])) || [],
  };

  return { data: dataMap, isLoading, error };
};

export const useGetCartItem = ({
  product_variant_id,
  hasProductVariant,
}: {
  product_variant_id: string;
  hasProductVariant?: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [
      hasProductVariant
        ? QueryKeys.CART_ITEM_WITH_PRODUCT_VARIANT
        : QueryKeys.CART_ITEM,
      product_variant_id,
    ],
    queryFn: async () =>
      await cartServices.getCartItem({ product_variant_id, hasProductVariant }),
    staleTime: Infinity,
  });

  const dataMap = {
    withProductVariant:
      (hasProductVariant && data && (data as TCartItemWithProductVariant)) ||
      undefined,
    withoutProductVariant:
      (!hasProductVariant && data && (data as TCartItem)) || undefined,
  };

  return { data: dataMap, isLoading, error };
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
