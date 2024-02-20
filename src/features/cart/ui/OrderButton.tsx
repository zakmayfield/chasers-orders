import { OrderType } from '@/features/dashboard/pages/recent-orders/RecentOrders';
import { useToast } from '@/hooks/general.hooks';
import {
  CreateOrderPayload,
  createOrder,
} from '@/services/mutations/orders.create';
import { getCart } from '@/services/queries/cart.getCart';
import { CartCache } from '@/types/types.cart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function OrderButton() {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  // Cart Cache query
  const { data: cartData } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  const { mutate, isSuccess } = useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      notify(`Order placed`);

      // Set 'recent-orders' cache data to include new order
      queryClient.setQueryData(
        ['recent-orders'],
        (oldData: OrderType[] | undefined) => {
          return oldData ? [data, ...oldData] : oldData;
        }
      );

      // Clear 'cart' items cache after successful order
      queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) => {
        return oldData ? { ...oldData, items: [] } : oldData;
      });
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
      className={`col-start-1 col-span-3 text-center border rounded-lg py-2 mt-6 focus:ring-green-600 focus:ring-2 shadow-sm ${cartData?.items.length === 0 && 'bg-slate-50'}`}
      disabled={isSuccess || cartData?.items.length === 0}
    >
      {isSuccess ? (
        '👍'
      ) : (
        <span
          className={`font-light ${cartData?.items.length === 0 && 'opacity-50 font-extralight'}`}
        >
          Place Order
        </span>
      )}
    </button>
  );
}
