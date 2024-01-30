'use client';

import { Cart, Unit } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function ConfirmOrder() {
  const queryClient = useQueryClient();

  type CartCache = Cart & {
    items: Unit[];
  };

  const [cartCache, setCartCache] = useState<CartCache | null>(null);

  useEffect(() => {
    console.log(cartCache);
  }, [cartCache]);

  return (
    <div>
      <button
        onClick={async () => {
          const cartQuery: CartCache = await queryClient.fetchQuery(['cart']);
          setCartCache(cartQuery);
        }}
      >
        Place order
      </button>

      {cartCache && <pre>{JSON.stringify(cartCache, null, 2)}</pre>}
    </div>
  );
}
