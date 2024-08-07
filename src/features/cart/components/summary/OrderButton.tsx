import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks';
import {
  CreateOrderPayload,
  createOrder,
} from '@/services/mutations/createOrder';
import { CartCache, OrderType } from '@/types/cart';
import { LoadingSpinner } from '@/shared/components';
import { getUser } from '@/services/queries/getUser';
import { useGetCart } from '@/shared/hooks/queries';
import { QueryKeys } from '@/types/hooks';

export const OrderButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { notify } = useToast();

  // Cart cache query
  const { data: cartData, isFetching } = useGetCart();

  // Create order mutation
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
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

      // fetch user dashboard since we are redirecting there
      queryClient.fetchQuery({
        queryKey: [QueryKeys.DASHBOARD],
        queryFn: getUser,
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
