'use client';
import { CartItems } from './components/items/CartItems';
import { Summary } from './components/cart-summary/Summary';

export const Cart = () => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <CartItems />
      <Summary />
    </div>
  );
};
