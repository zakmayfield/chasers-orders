import { QueryKeys } from '@/shared/types/Cache';
import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { cartServices } from '@/shared/utils/services/cartServices';
import {
  TCartItem,
  TCartItemWithProductVariant,
  TCartWithItemsAndProductVariants,
} from '@/shared/types/Cart';
import { Query, useQueryClient } from '@tanstack/react-query';

export const useGetCart = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART],
    queryFn: cartServices.getCart,
    staleTime: Infinity,
  });
  return { cart: data, isLoading, error };
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

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.createCartItem,
    handleSuccess(data) {
      queryClient.setQueryData<TCartWithItemsAndProductVariants>(
        [QueryKeys.CART],
        (oldData) => {
          return oldData && { ...oldData, items: [data, ...oldData.items] };
        }
      );
    },
  });

  return { mutate, data, isLoading, error };
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.deleteCartItem,
    handleSuccess(variables) {
      queryClient.setQueryData<TCartWithItemsAndProductVariants>(
        [QueryKeys.CART],
        (oldData) => {
          return (
            oldData && {
              ...oldData,
              items: oldData.items.filter(
                (cartItem) =>
                  cartItem.product_variant_id !== variables?.product_variant_id
              ),
            }
          );
        }
      );
    },
  });

  return { mutate, data, isLoading, error };
};

export const useEmptyCart = () => {
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.emptyCart,

    handleSuccess() {
      queryClient.setQueryData<TCartWithItemsAndProductVariants>(
        [QueryKeys.CART],
        (oldData) => {
          return (
            oldData && {
              ...oldData,
              items: [],
            }
          );
        }
      );
    },
  });

  return { mutate, data, isLoading, error };
};
