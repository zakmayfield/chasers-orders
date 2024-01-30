'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/store/cart.get';
import RemoveCartItemButton from './ui/RemoveCartItemButton';
import UpdateCartItem from './ui/UpdateCartItem';
import ConfirmOrder from './ui/ConfirmOrder';
import { CartCache } from '@/types/types.cart';

export default function Cart() {
  const { isLoading, isError, data, error } = useQuery<
    CartCache | undefined,
    Error
  >({
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
        {data && data.items.length < 1 && (
          <div>
            <Link href='/products' className='underline'>
              Visit the shop to add items to your cart.
            </Link>
          </div>
        )}
        <div className='flex w-full'>
          <div className='flex flex-col gap-6 border w-1/2'>
            {data &&
              data.items.map((item) => (
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
                  <RemoveCartItemButton unitId={item.unitId} cartId={data.id} />
                </div>
              ))}
          </div>

          <div className='border w-1/2'>
            <ConfirmOrder />
          </div>
        </div>
      </div>
    </div>
  );
}
