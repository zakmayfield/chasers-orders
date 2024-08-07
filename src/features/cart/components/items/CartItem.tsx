'use client';

import { CartItem as CartItemType } from '@/types/cart';
import { RemoveCartItemButton } from './RemoveCartItemButton';
import { UpdateCartItemSize } from './UpdateCartItemSize';
import { QuantityUpdate } from './QuantityUpdate';

type CartItemProps = {
  payload: {
    cartId: string;
    cartItem: CartItemType;
  };
};

export const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    payload: { cartId, cartItem },
  } = props;

  const { quantity, unit } = cartItem;
  const { product } = unit;

  return (
    <div className='w-full pb-3 border-b flex items-center gap-10'>
      <RemoveCartItemButton
        payload={{
          cartId,
          unitId: cartItem.unitId,
        }}
      />

      <div>
        <div className='flex items-start mt-3 flex-col xl:flex-row xl:items-center xl:space-x-2'>
          <h3 className='text-base xl:text-lg font-medium'>{product.name}</h3>
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

          <QuantityUpdate
            cartId={cartId}
            unitId={cartItem.unitId}
            quantity={quantity}
          />
        </div>
      </div>
    </div>
  );
};
