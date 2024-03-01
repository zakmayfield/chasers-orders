'use client';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';

interface OrderAgainButtonProps {}

const OrderAgainButton: FC<OrderAgainButtonProps> = ({}) => {
  const {} = useMutation({
    mutationFn: async () => {},
  });
  return (
    <button className='underline text-purple-800 text-sm'>order again</button>
  );
};

export default OrderAgainButton;
