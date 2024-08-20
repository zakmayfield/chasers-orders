import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/utils';
import {
  CreateOrderPayload,
  OrderData,
  createOrder,
} from '@/services/mutations/createOrder';
import { CartCache, OrderType } from '@/types/cart';
import { LoadingSpinner } from '@/shared/components/ui';
import { getUser } from '@/services/queries/getUser';
import { useGetCart } from '@/shared/hooks/data';
import { QueryKeys } from '@/types/hooks';
import { useCustomMutation } from '@/shared/hooks/custom';

export const OrderButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { data: cartData, isFetching } = useGetCart();
  const { mutate, isSuccess, isLoading } = useCustomMutation<
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

      queryClient.fetchQuery({
        queryKey: [QueryKeys.DASHBOARD],
        queryFn: getUser,
      });

      queryClient.setQueryData(
        [QueryKeys.CART],
        (oldData: CartCache | undefined) => {
          return oldData ? { ...oldData, items: [] } : oldData;
        }
      );

      router.push('/dashboard');
    },
    handleError(error) {
      notify(error.message, 'error');
    },
  });

  const handlePlaceOrder = async () => {
    const cartCache: CartCache | undefined = queryClient.getQueryData([
      QueryKeys.CART,
    ]);
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
