import { FC } from 'react';
import { CartItem } from './CartItem';
import type { CartCache } from '@/features/cart/types';

interface ItemsContainerProps {
  cart: CartCache | undefined;
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
