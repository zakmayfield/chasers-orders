'use client';

import { UnitsOnCartCacheType } from '@/types/types.cart';
import RemoveCartItemButton from './RemoveCartItemButton';
import UpdateCartItemQuantity from './UpdateCartItemQuantity';
import UpdateCartItemSize from './UpdateCartItemSize';

type CartItemProps = {
  payload: {
    cartId: string;
    cartItem: UnitsOnCartCacheType;
  };
};

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    payload: { cartId, cartItem },
  } = props;

  const { quantity, unit } = cartItem;
  const { product } = unit;

  // TODO: add an 'x' icon to handle removing item from cart
  return (
    <div className='w-full pb-3 border-b flex items-center gap-10'>
      <RemoveCartItemButton
        payload={{
          cartId,
          unitId: cartItem.unitId,
        }}
      />

      <div>
        <div className='flex space-x-2 items-center'>
          <h3 className='text-lg font-medium'>{product.name}</h3>
          <p className='text-sm text-gray-500'>{product.category}</p>
        </div>

        <div className='flex space-x-4 my-2'>
          <UpdateCartItemSize
            payload={{
              cartId,
              unitId: cartItem.unitId,
              sizeData: unit.size,
            }}
          />

          <UpdateCartItemQuantity
            payload={{
              cartId,
              unitId: cartItem.unitId,
              quantityData: quantity,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
