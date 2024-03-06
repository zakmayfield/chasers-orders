'use client';

import { CartItem } from './CartItem';
import { ImSpinner2 } from 'react-icons/im';
import { CartItemLoadingSkeleton } from './index';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { useFetchCartQuery } from '../helpers.cart';

export const CartItemContainer = () => {
  const { data, isFetching } = useFetchCartQuery();

  return (
    <div className='col-start-3 col-span-4'>
      {/* Cart Items Container Header */}
      <div className='flex items-center gap-3'>
        <h4 className=' text-2xl font-extralight'>
          <span>Cart</span>
        </h4>

        {isFetching ? (
          <ImSpinner2 className='animate-spin' />
        ) : (
          <p>
            (<span>{data?.items.length}</span>)
          </p>
        )}
      </div>

      {/* Cart Items */}
      {/* No items in cart */}
      {data && data.items.length === 0 && (
        <div className='border-t py-6 font-light flex items-center gap-3  '>
          <span>
            <MdOutlineRemoveShoppingCart />
          </span>
          <span>Your cart is empty</span>
        </div>
      )}

      {/* Cart has items */}
      {isFetching ? (
        <div>
          {[1, 2].map((item) => (
            <CartItemLoadingSkeleton key={item} />
          ))}
        </div>
      ) : (
        <div>
          {data &&
            data.items.map((item) => (
              <CartItem
                key={item.unitId}
                payload={{
                  cartId: data.id,
                  cartItem: item,
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};
