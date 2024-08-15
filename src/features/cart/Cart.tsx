'use client';
import { CartItems } from './items/CartItems';
import { Summary } from './cart-summary/Summary';

export const Cart = () => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <CartItems />
      <Summary />
    </div>
  );
};
