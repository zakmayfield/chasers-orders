import { CartCache } from '@/types/types.cart';
import CartItem from './CartItem';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/services/queries/cart.getCart';

export default function CartItemContainer() {
  const { data } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  console.log('data', data);

  return (
    <div className='col-start-3 col-span-4'>
      {data &&
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
  );
}
