'use client';

import { CartCache } from '@/types/types.cart';
import CartItem from './CartItem';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/services/queries/cart.getCart';
import { ImSpinner2 } from 'react-icons/im';

export default function CartItemContainer() {
  const { data, isFetching } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

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

      {/* Itemz */}
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
  );
}
