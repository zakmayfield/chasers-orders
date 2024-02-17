'use client';

import { CartCache } from '@/types/types.cart';
import CartItem from './CartItem';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/services/queries/cart.getCart';
import { ImSpinner2 } from 'react-icons/im';
import CartItemLoadingSkeleton from './CartItemLoadingSkeleton';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

export default function CartItemContainer() {
  const { data, isFetching } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });
  // TODO: empty cart state
  return (
    <div className='col-start-3 col-span-4'>
      {/* Cart Items Container Header */}
      <div className='flex items-center gap-3 font-extralight'>
        <h4 className='h-24 text-2xl flex items-center pl-12'>Cart</h4>
        {isFetching ? (
          <span className='animate-spin'>
            <ImSpinner2 />
          </span>
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
}
