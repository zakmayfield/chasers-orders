'use client';

import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { CartCache, OrderAgainData, OrderType } from '@/types/cart';
import { useRouter } from 'next/navigation';
import { useToast } from '@/shared/hooks';
import { orderAgain } from '@/services/mutations/orderAgain';
import { useCustomMutation } from '@/shared/hooks/mutations';
import { QueryKeys } from '@/types/hooks';

interface OrderAgainButtonProps {
  order: OrderType;
}

const OrderAgainButton: FC<OrderAgainButtonProps> = ({ order }) => {
  const router = useRouter();
  const { notify } = useToast();
  const queryClient = useQueryClient();

  const { mutate } = useCustomMutation<OrderAgainData, OrderType>({
    mutationFn: orderAgain,
    handleSuccess(data) {
      queryClient.setQueryData(
        [QueryKeys.CART],
        (oldData: CartCache | undefined) =>
          oldData ? data.cartPayload : oldData
      );

      notify(`Added (${data.batchPayload.count}) items to cart`);

      router.push('/cart');
    },
  });

  const handleOrderAgain = () => {
    mutate(order);
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
