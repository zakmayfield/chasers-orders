'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { CartCache, OrderType } from '@/types/cart';
import { useRouter } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { useToast } from '@/shared/hooks';
import { orderAgain } from '@/services/mutations/orderAgain';

interface OrderAgainButtonProps {
  order: OrderType;
}

const OrderAgainButton: FC<OrderAgainButtonProps> = ({ order }) => {
  const router = useRouter();
  const { notify } = useToast();
  const queryClient = useQueryClient();

  const { mutate: orderAgainMutation } = useMutation({
    mutationFn: orderAgain,
    onSuccess(data) {
      const { batchPayload, cartPayload } = data;

      handleSetCache(cartPayload);
      handleNotify(batchPayload);
      router.push('/cart');
    },
  });

  function handleSetCache(cartPayload: CartCache) {
    queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) =>
      oldData ? cartPayload : oldData
    );
  }

  function handleNotify(batchPayload: Prisma.BatchPayload) {
    notify(`Added (${batchPayload.count}) items to cart`);
  }

  const handleOrderAgain = () => {
    orderAgainMutation(order);
  };

  return (
    <button
      onClick={handleOrderAgain}
      className='underline text-purple-800 text-sm'
    >
      order again
    </button>
  );
};

export default OrderAgainButton;
