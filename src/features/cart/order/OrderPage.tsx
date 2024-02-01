'use client';

import { getCart } from '@/store/cart.get';
import { CartCache } from '@/types/types.cart';
import { useQuery } from '@tanstack/react-query';

export default function OrderPage() {
  const { data, error, isLoading } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data?.items, null, 2)}</pre>
    </div>
  );
}
