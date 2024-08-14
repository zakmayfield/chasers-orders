'use client';

import { CartItem as CartItemType } from '@/types/cart';
import { RemoveCartItemButton, UpdateCartItemSize, QuantityUpdate } from './';

type CartItemProps = {
  cartId: string;
  cartItem: CartItemType;
};

export const CartItem: React.FC<CartItemProps> = (props) => {
  return (
    <div className='w-full pb-3 border-b flex items-center gap-10'>
      <RemoveCartItemButton
        cartId={props.cartId}
        unitId={props.cartItem.unitId}
      />

      <div>
        <div className='flex items-start mt-3 flex-col xl:flex-row xl:items-center xl:space-x-2'>
          <h3 className='text-base xl:text-lg font-medium'>
            {props.cartItem.unit.product.name}
          </h3>
          <p className='text-sm text-gray-500'>
            {props.cartItem.unit.product.category}
          </p>
        </div>

        <div className='flex space-x-4 my-2'>
          <UpdateCartItemSize
            cartId={props.cartId}
            unitId={props.cartItem.unitId}
            sizeData={props.cartItem.unit.size}
          />

          <QuantityUpdate
            cartId={props.cartId}
            unitId={props.cartItem.unitId}
            quantity={props.cartItem.quantity}
          />
        </div>
      </div>
    </div>
  );
};
