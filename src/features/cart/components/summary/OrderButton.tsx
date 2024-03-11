import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderType } from '@/features/dashboard/recent-orders/RecentOrders';
import { useToast } from '@/hooks/general.hooks';
import {
  CreateOrderPayload,
  createOrder,
} from '@/services/mutations/orders.create';
import { getCart } from '@/features/cart/services.cart';
import { CartCache } from '@/features/cart/types';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/features/shared/LoadingSpinner';

export const OrderButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { notify } = useToast();

  // Cart cache query
  const { data: cartData } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  // Create order mutation
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      notify(`Order placed`);

      // Set 'recent-orders' cache data to include new order
      queryClient.setQueryData(
        ['recent-orders'],
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

      // Clear 'cart' items cache after successful order
      queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) => {
        return oldData ? { ...oldData, items: [] } : oldData;
      });

      {
        /* TODO: implent routing on success */
      }
      // router.push('/dashboard/recent-orders');
    },
    onError(error) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
  });

  const handlePlaceOrder = async () => {
    const cartCache: CartCache | undefined = queryClient.getQueryData(['cart']);
    const payload: CreateOrderPayload = {
      items: cartCache!.items,
      cartId: cartCache!.id,
    };
    mutate(payload);
  };
  return (
    <button
      onClick={handlePlaceOrder}
      className={`
        col-start-1 col-span-3 text-center border rounded-lg py-2 mt-6 focus:ring-green-600 focus:ring-2 shadow-sm 
        ${cartData?.items.length === 0 && 'bg-slate-50'}
      `}
      disabled={isSuccess || !cartData || cartData.items.length === 0}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <span
          className={`font-light ${cartData?.items.length === 0 && 'opacity-50 font-extralight'}`}
        >
          Place Order
        </span>
      )}
    </button>
  );
};
