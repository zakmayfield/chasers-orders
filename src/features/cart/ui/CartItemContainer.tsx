import { CartCache } from '@/types/types.cart';
import CartItem from './CartItem';
import GridContainer from '@/features/ui/layout/GridContainer';
import Link from 'next/link';

type CartItemContainerProps = {
  cartData: CartCache;
};

const CartItemContainer: React.FC<CartItemContainerProps> = (props) => {
  const { cartData } = props;

  return (
    <GridContainer cols={12}>
      {cartData.items.map((item) => (
        <CartItem
          key={item.unitId}
          payload={{
            cartId: cartData.id,
            cartItem: item,
          }}
        />
      ))}
      <Link
        href='/cart/order'
        className='col-start-7 col-span-2 text-center border rounded-lg py-2'
      >
        Confirm Order
      </Link>
    </GridContainer>
  );
};

export default CartItemContainer;
