import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/utils';
import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { cartServices } from '@/shared/utils/services/cartServices';
import { QueryKeys } from '@/shared/types/Cache';
import { TCart } from '@/shared/types/Cart';

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
    queryKey: [QueryKeys.CART_ITEM_WITH_PRODUCT_VARIANT, product_variant_id],
    queryFn: async () => await cartServices.getCartItem({ product_variant_id }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useCreateCart = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.createCart,
  });
  return { mutate, data, isLoading, error };
};

export const useAddToCart = () => {
  const { notify } = useToast();
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.createCartItem,
    handleSuccess(data) {
      queryClient.setQueryData<TCart>([QueryKeys.CART], (oldData) => {
        return oldData && { ...oldData, items: [data, ...oldData.items] };
      });

      notify('Added to cart');
    },
  });

  return { mutate, data, isLoading, error };
};

export const useDeleteCartItem = () => {
  const { notify } = useToast();
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.deleteCartItem,
    handleSuccess(variables) {
      queryClient.setQueryData<TCart>([QueryKeys.CART], (oldData) => {
        return (
          oldData && {
            ...oldData,
            items: oldData.items.filter(
              (cartItem) =>
                cartItem.product_variant_id !== variables.product_variant_id
            ),
          }
        );
      });

      notify('Removed from cart');
    },
  });

  return { mutate, data, isLoading, error };
};

export const useEmptyCart = () => {
  const { notify } = useToast();
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.emptyCart,

    handleSuccess(data) {
      queryClient.setQueryData<TCart>([QueryKeys.CART], (oldData) => {
        return (
          oldData && {
            ...oldData,
            items: [],
          }
        );
      });

      notify(`Removed ${data.count} item(s) from cart`);
    },
  });

  return { mutate, data, isLoading, error };
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.updateQuantity,
    handleError(error) {
      notify(error.message, 'error');
    },
    handleSuccess(variables) {
      notify(`Updated quantity to ${variables?.quantity}`);

      queryClient.setQueryData<TCart>([QueryKeys.CART], (oldData) => {
        return oldData
          ? {
              ...oldData,
              items: oldData.items.map((item) =>
                item.product_variant_id === variables?.product_variant_id
                  ? { ...item, quantity: variables.quantity }
                  : item
              ),
            }
          : oldData;
      });
    },
  });

  return { mutate, isLoading, error };
};

export const useUpdateSize = () => {
  const { mutate, isLoading, error } = useCustomMutation({
    mutationFn: cartServices.updateSize,
  });

  return { mutate, isLoading, error };
};
