'use client';

import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/store/cart.get';
import { CartCache } from '@/types/types.cart';
import { ToastContainer } from 'react-toastify';
import CartItem from './ui/CartItem';
import EmptyCart from './ui/EmptyCart';

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
        {data && data.items.length < 1 && <EmptyCart />}

        {data &&
          data.items.length > 0 &&
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

      <ToastContainer />
    </div>
  );
}
