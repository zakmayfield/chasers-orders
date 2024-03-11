import { FC } from 'react';
import { CartItem } from './CartItem';
import type { CartCache2 } from '@/features/cart/types';

interface ItemsContainerProps {
  cart: CartCache2 | undefined;
}

export const ItemsContainer: FC<ItemsContainerProps> = ({ cart }) => {
  return (
    <div>
      {cart &&
        cart.items.map((item) => (
          <CartItem
            key={item.unitId}
            payload={{
              cartId: cart.id,
              cartItem: item,
            }}
          />
        ))}
    </div>
  );
};
