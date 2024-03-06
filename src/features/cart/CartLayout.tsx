'use client';

import { CartItemContainer, OrderSummary } from './components';

export const CartLayout = () => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      {/* Review cart and edit */}
      <CartItemContainer />

      {/* Order summary */}
      <OrderSummary />
    </div>
  );
};
