import { FC } from 'react';
import { CartItem } from './CartItem';
import type { CartCache } from '@/types/cart';

interface ItemsContainerProps {
  cart: CartCache | undefined;
}

export const ItemsContainer: FC<ItemsContainerProps> = ({ cart }) => {
  return (
    <div>
      {cart &&
        cart.items.map((item) => (
          <CartItem key={item.unitId} cartId={cart.id} cartItem={item} />
        ))}
    </div>
  );
};
