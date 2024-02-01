'use client';

import { CartCache } from '@/types/types.cart';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

export default function ConfirmOrder() {
  const queryClient = useQueryClient();

  const [cartCache, setCartCache] = useState<CartCache | undefined>();

  const fetchCartCache = async () =>
    setCartCache(await queryClient.fetchQuery(['cart']));

  return (
    <div>
      <Link href='/order'>Confirm order</Link>
      {/* {cartCache && <pre>{JSON.stringify(cartCache, null, 2)}</pre>} */}
    </div>
  );
}
