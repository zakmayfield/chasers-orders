import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderType } from '@/features/dashboard/recent-orders/RecentOrders';
import { useToast } from '@/hooks/general.hooks';
import {
  CreateOrderPayload,
  createOrder,
} from '@/services/mutations/orders.create';
import { getCart } from '@/features/cart/services.cart';
import { CartCache } from '@/features/cart/types';
import { LoadingSpinner } from '@/shared';
import { getDashboardUser } from '@/services/queries/user.getDashboardUser';

export const OrderButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { notify } = useToast();

  // Cart cache query
  const { data: cartData, isFetching } = useQuery<CartCache | undefined, Error>(
    {
      queryKey: ['cart'],
      queryFn: getCart,
      staleTime: Infinity,
    }
  );

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

      // fetch user dashboard since we are redirecting there
      queryClient.fetchQuery({
        queryKey: ['user-dashboard'],
        queryFn: getDashboardUser,
      });

      // Clear 'cart' items cache after successful order
      queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) => {
        return oldData ? { ...oldData, items: [] } : oldData;
      });

      router.push('/dashboard');
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

  if (isFetching) {
    return (
      <div className='col-start-1 col-span-3 text-center rounded-lg  mt-3 bg-light-secondary h-14 animate-pulse'></div>
    );
  }

  return (
    <button
      onClick={handlePlaceOrder}
      className={`
        col-start-1 col-span-3 text-center border rounded-lg py-3 mt-3 focus:ring-green-600 focus:ring-2 shadow-sm h-14
        bg-light-green-500 
        ${(!cartData || cartData.items.length > 0) && 'hover:bg-light-green-300'}
        ${(!cartData || cartData.items.length === 0) && 'bg-light-green-300/50'}
      `}
      disabled={
        isSuccess || isLoading || !cartData || cartData.items.length === 0
      }
    >
      {isLoading ? (
        <LoadingSpinner className='mx-auto text-white text-xl' />
      ) : (
        <span className={`text-white text-lg font-normal`}>Place Order</span>
      )}
    </button>
  );
};
