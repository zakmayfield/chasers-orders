import { UnitsOnCartCacheType } from '@/types/types.cart';
import RemoveCartItemButton from './RemoveCartItemButton';
import UpdateCartItem from './UpdateCartItem';

type CartItemProps = {
  payload: {
    cartId: string;
    cartItem: UnitsOnCartCacheType;
  };
};

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    payload: { cartId, cartItem },
  } = props;

  return (
    <div>
      <div key={cartItem.unit.code}>
        <div className='flex items-center gap-3'>
          <p>{cartItem.unit.product.name}</p>
          <p>{cartItem.unit.product.category}</p>
          <p>Size: {cartItem.unit.size}</p>
        </div>

        <UpdateCartItem
          payload={{
            cartId,
            unitId: cartItem.unitId,
            quantityData: cartItem.quantity,
          }}
        />

        <RemoveCartItemButton
          payload={{
            cartId,
            unitId: cartItem.unitId,
          }}
        />
      </div>
    </div>
  );
};

export default CartItem;
