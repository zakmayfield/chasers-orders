'use client';
import { CartItems } from './items/CartItems';
import { CartOrderSummary } from './summary/CartOrderSummary';

export const Cart = () => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <CartItems />
      <CartOrderSummary />
    </div>
  );
};
