'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/store/cart.get';
import RemoveCartItemButton from './ui/RemoveCartItemButton';
import UpdateCartItem from './ui/UpdateCartItem';
import { CartCache } from '@/types/types.cart';
import { ToastContainer } from 'react-toastify';

export default function Cart() {
  const { isLoading, isError, data, error } = useQuery<
    CartCache | undefined,
    Error
  >({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <div>
        {data && data.items.length < 1 && (
          <div>
            <Link href='/products' className='underline'>
              Visit the shop to add items to your cart.
            </Link>
          </div>
        )}

        <div className='flex w-full'>
          {data && data.items.length > 0 && (
            <div className='flex flex-col gap-6'>
              {data.items.map((item) => (
                <div key={item.unit.code}>
                  <div className='flex items-center gap-3'>
                    <p>{item.unit.product.name}</p>
                    <p>{item.unit.product.category}</p>
                    <p>Size: {item.unit.size}</p>
                  </div>

                  <UpdateCartItem
                    cartId={data.id}
                    unitId={item.unitId}
                    quantityData={item.quantity}
                  />
                  <RemoveCartItemButton
                    payload={{ unitId: item.unitId, cartId: data.id }}
                  />
                </div>
              ))}

              <Link href='/cart/order'>Confirm order</Link>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
