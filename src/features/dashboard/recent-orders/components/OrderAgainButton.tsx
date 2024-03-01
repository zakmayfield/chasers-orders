'use client';
import { orderAgain } from '@/services/mutations/cart.orderAgain';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { OrderType } from '../RecentOrders';
import { CartCache } from '@/types/types.cart';

interface OrderAgainButtonProps {
  order: OrderType;
}

const OrderAgainButton: FC<OrderAgainButtonProps> = ({ order }) => {
  const { mutate: orderAgainMutation } = useMutation({
    mutationFn: orderAgain,
    onSuccess(data) {
      console.log('~~~order again mutation data~~~', data);

      // TODO: set cart cache items to items from order, will need to be formatted or more data fetched from the API
      const records = data;
      let x: CartCache;
    },
  });

  const handleOrderAgain = () => {
    console.log('~~~order~~~', order);
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
