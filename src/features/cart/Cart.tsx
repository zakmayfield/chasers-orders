'use client';

import { getCart } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { CartType } from '@/types';
import RemoveCartItemButton from './ui/RemoveCartItemButton';

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
      <div className='grid grid-cols-3 gap-6'>
        {data.items.map((item) => (
          <div key={item.unit.code}>
            <p>{item.unit.product.name}</p>
            <p>{item.unit.product.category}</p>
            <p>Size: {item.unit.size}</p>
            <p>Price: {item.unit.price}</p>
            <p>Quantity: {item.quantity}</p>

            <RemoveCartItemButton unitId={item.unit.id} cartId={data.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
