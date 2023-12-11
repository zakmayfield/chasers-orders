'use client';

import { getCart } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { RefinedCartItem } from '@/types';

export default function Cart() {
  const { isLoading, isError, data, error } = useQuery<
    RefinedCartItem[],
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
      <div className='grid grid-cols-3 gap-6'>
        {data.map((item) => (
          <div key={item.productId}>
            <p>{item.productName}</p>
            <p>{item.productCategory}</p>
            <p>Size: {item.unitSize}</p>
            <p>Price: {item.unitPrice}</p>
            <p>Quantity: {item.cartQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
