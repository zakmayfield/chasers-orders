'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '@/store/order.create';
import { useToast } from '@/hooks/useToast';
import { CartCache } from '@/types/types.cart';
import { useRouter } from 'next/navigation';

export default function PlaceOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { notify, ToastContainer } = useToast();

  const { mutate } = useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      notify(`Order placed`);
      setTimeout(() => {
        router.push('/profile');
      }, 3000);
      // TODO: clear cart cache after successful order
    },
    onError(error) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
  });

  const handlePlaceOrder = async () => {
    const cartCache: CartCache = await queryClient.fetchQuery(['cart']);
    const items = cartCache.items;
    mutate(items);
  };

  return (
    <div className='w-full flex justify-end'>
      <button onClick={handlePlaceOrder}>Place Order</button>
      <ToastContainer />
    </div>
  );
}
