'use client';

import { CartItemContainer, OrderSummary } from './components';

export const Cart = () => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <CartItemContainer />
      <OrderSummary />
    </div>
  );
};
