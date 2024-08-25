import {
  CreateOrderPayload,
  OrderData,
  createOrder,
} from '@/services/mutations/createOrder';
import { useCustomMutation } from '../custom';
import { useToast } from '../utils';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/hooks';
import { CartCache, OrderType } from '@/types/cart';

export const useCreateOrder = ({
  cartData,
}: {
  cartData: CartCache | undefined;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate, isLoading } = useCustomMutation<
    OrderData,
    CreateOrderPayload
  >({
    mutationFn: createOrder,
    handleSuccess(data) {
      notify(`Order placed`);

      queryClient.setQueryData(
        [QueryKeys.ORDERS],
        (oldData: OrderType[] | undefined) => {
          // Limit to 5
          let x = oldData;
          if (x && x.length <= 5) {
            x.pop();
            x = [data, ...x];
          }
          return oldData ? x : oldData;
        }
      );

      queryClient.invalidateQueries([QueryKeys.DASHBOARD]);

      queryClient.setQueryData(
        [QueryKeys.CART],
        (oldData: CartCache | undefined) => {
          return oldData ? { ...oldData, items: [] } : oldData;
        }
      );
    },
    handleError(error) {
      notify(error.message, 'error');
    },
  });

  const order = () =>
    mutate({
      cartId: cartData?.id,
      items: cartData?.items,
    });

  return { order, createOrderLoading: isLoading };
};
