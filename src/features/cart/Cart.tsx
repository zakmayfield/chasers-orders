'use client';

import { getCart } from '@/store/cart/cartStore';
import { useQuery } from '@tanstack/react-query';
import { CartType } from '@/types';
import RemoveCartItemButton from './ui/RemoveCartItemButton';
import UpdateCartItem from './ui/UpdateCartItem';

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

  function generateTotal(): number {
    let total: number = 0;

    if (data && data.items) {
      data.items.forEach((item) => {
        if (
          typeof item.quantity === 'number' &&
          typeof item.unit.price === 'number'
        ) {
          total += item.unit.price * item.quantity;
        }
      });
    }

    return total;
  }

  // TODO: UI is being re arranged when mutations occur, add arrangement order state for consistency

  return (
    <div>
      <div>Cart</div>
      <div className='grid grid-cols-3 gap-6'>
        {data.items.map((item) => (
          <div key={item.unit.code}>
            <p>{item.unit.product.name}</p>
            <p>{item.unit.product.category}</p>
            <p>Size: {item.unit.size}</p>
            <p>Price: {(item.unit.price * item.quantity).toFixed(2)}</p>

            <UpdateCartItem
              cartId={data.id}
              unitId={item.unit.id}
              quantityData={item.quantity}
            />
            <RemoveCartItemButton unitId={item.unit.id} cartId={data.id} />
          </div>
        ))}
      </div>
      <div className='mt-12'>Total: {generateTotal().toFixed(2)}</div>
    </div>
  );
}
