import { OrderType } from '@/features/dashboard/pages/recent-orders/RecentOrders';
import { useToast } from '@/hooks/general.hooks';
import {
  CreateOrderPayload,
  createOrder,
} from '@/services/mutations/orders.create';
import { CartCache } from '@/types/types.cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function OrderButton() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { notify } = useToast();

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
      setTimeout(() => {
        router.push('/dashboard');
      }, 5000);
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
      className={`col-start-1 col-span-3 text-center border rounded-lg py-2 ${isSuccess && 'bg-black bg-opacity-5'}`}
      disabled={isSuccess}
    >
      {isSuccess ? '👍' : 'Place Order'}
    </button>
  );
}
