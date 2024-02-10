'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateOrderPayload,
  createOrder,
} from '@/services/mutations/orders.create';
import { useToast } from '@/hooks/general.hooks';
import { CartCache } from '@/types/types.cart';
import { useRouter } from 'next/navigation';
import { OrderType } from '@/features/dashboard/pages/recent-orders/RecentOrders';

export default function PlaceOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { notify } = useToast();

  const { mutate } = useMutation({
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
      queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) =>
        oldData
          ? {
              ...oldData,
              items: [],
            }
          : oldData
      );

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
    <div className='w-full flex justify-end'>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
