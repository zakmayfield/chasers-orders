'use client';

import { CartCache } from '@/types/types.cart';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

// TODO: Fix this after Cart and cache get fixed

export default function ConfirmOrder() {
  const queryClient = useQueryClient();

  const [cartCache, setCartCache] = useState<CartCache | undefined>();

  const fetchCartCache = async () =>
    setCartCache(await queryClient.fetchQuery(['cart']));

  return (
    <div>
      <button onClick={fetchCartCache}>Place order</button>

      {cartCache && <pre>{JSON.stringify(cartCache, null, 2)}</pre>}
    </div>
  );
}
