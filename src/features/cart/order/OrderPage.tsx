'use client';

import { getCart } from '@/store/cart.get';
import { CartCache } from '@/types/types.cart';
import { useQuery } from '@tanstack/react-query';
import PlaceOrder from '@/features/cart/order/PlaceOrder';
import ShippingDetails from '@/features/cart/order/ShippingDetails';

export default function OrderPage() {
  const { data, error, isLoading } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className='w-full'>
        <div className='w-2/4 mx-auto border'>
          <div className='flex gap-12'>
            <ShippingDetails />
            <pre>{JSON.stringify(data?.items, null, 2)}</pre>
          </div>
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
