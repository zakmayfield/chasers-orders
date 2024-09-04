import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/utils';
import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { cartServices } from '@/shared/utils/services/cartServices';
import { TCartWithItemsAndProductVariants } from '@/shared/types/Cart';
import { QueryKeys } from '@/shared/types/Cache';

export const useGetCart = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART],
    queryFn: cartServices.getCart,
    staleTime: Infinity,
  });
  return { cart: data, isLoading, error };
};

export const useGetCartItems = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CART_ITEMS_WITH_PRODUCT_VARIANT],
    queryFn: async () => await cartServices.getCartItems(),
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
    queryKey: [QueryKeys.CART_ITEM_WITH_PRODUCT_VARIANT, product_variant_id],
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

export const useAddToCart = () => {
  const { notify } = useToast();
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

      notify('Added to cart');
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
