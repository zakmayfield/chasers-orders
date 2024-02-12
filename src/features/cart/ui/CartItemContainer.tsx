import { CartCache } from '@/types/types.cart';
import CartItem from './CartItem';

type CartItemContainerProps = {
  cartData: CartCache;
};

const CartItemContainer: React.FC<CartItemContainerProps> = (props) => {
  const { cartData } = props;
  return (
    <div className='grid grid-cols-10 gap-y-3'>
      {cartData.items.map((item) => (
        <CartItem
          key={item.unitId}
          payload={{
            cartId: cartData.id,
            cartItem: item,
          }}
        />
      ))}
    </div>
  );
};

export default CartItemContainer;
