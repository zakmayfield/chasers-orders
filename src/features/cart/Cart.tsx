'use client';

import { getCart } from '@/store/cart/cart.get';
import { useQuery } from '@tanstack/react-query';
import { CartType } from '@/types';
import RemoveCartItemButton from './ui/RemoveCartItemButton';
import UpdateCartItem from './ui/UpdateCartItem';
import Link from 'next/link';

export default function Cart() {
  const { isLoading, isError, data, error } = useQuery<CartType, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <div>Cart</div>
      <div>
        {data.items.length < 1 && (
          <div>
            <Link href='/products' className='underline'>
              Visit the shop to add items to your cart.
            </Link>
          </div>
        )}
        <div className='flex flex-col gap-6 border w-1/2'>
          {data &&
            data.items.map((item) => (
              <div key={item.unit.code}>
                <div className='flex items-center gap-3'>
                  <p>{item.unit.product.name}</p>
                  <p>{item.unit.product.category}</p>
                  <p>Size: {item.unit.size}</p>
                  {/* <p>Price: {(item.unit.price * item.quantity).toFixed(2)}</p> */}
                </div>

                <UpdateCartItem
                  cartId={data.id}
                  unitId={item.unit.id}
                  quantityData={item.quantity}
                />
                <RemoveCartItemButton unitId={item.unit.id} cartId={data.id} />
                {/* <div className='mt-12'>Total: {generateTotal().toFixed(2)}</div> */}
              </div>
            ))}
        </div>

        {/* order confirmation */}
      </div>
    </div>
  );
}
