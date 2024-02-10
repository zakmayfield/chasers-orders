'use client';

import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/services/queries/cart.getCart';
import { CartCache } from '@/types/types.cart';
import EmptyCart from './ui/EmptyCart';
import Link from 'next/link';
import CartItemContainer from './ui/CartItemContainer';

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
      {data && data.items.length < 1 && <EmptyCart />}
      {data && data.items.length > 0 && <CartItemContainer cartData={data} />}
      <Link href='/cart/order'>Confirm Order</Link>
    </div>
  );
}
