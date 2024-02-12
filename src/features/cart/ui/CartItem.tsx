import { UnitsOnCartCacheType } from '@/types/types.cart';
import RemoveCartItemButton from './RemoveCartItemButton';
import UpdateCartItemQuantity from './UpdateCartItemQuantity';
import UpdateCartItemSize from './UpdateCartItemSize';

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

  const { quantity, unit } = cartItem;
  const { product } = unit;

  // TODO: size is being set to the first available size when added to cart, instead of selected size
  return (
    <div className='pb-3 border-b'>
      <div className='flex space-x-2 items-center'>
        <h3 className='text-lg font-medium'>{product.name}</h3>
        <p className='text-sm text-gray-500'>{product.category}</p>
      </div>

      <div className='flex space-x-4 my-2'>
        <UpdateCartItemSize
          payload={{
            cartId,
            unitId: cartItem.unitId,
            sizeData: unit.size,
          }}
        />

        <UpdateCartItemQuantity
          payload={{
            cartId,
            unitId: cartItem.unitId,
            quantityData: quantity,
          }}
        />
      </div>

      <RemoveCartItemButton
        payload={{
          cartId,
          unitId: cartItem.unitId,
        }}
      />
    </div>
  );
};

export default CartItem;

/*
  original

    <div>
      <div>
        <div className='flex items-center gap-3'>
          <p>{cartItem.unit.product.name}</p>
          <p>{cartItem.unit.product.category}</p>
          <p>Size: {cartItem.unit.size}</p>
        </div>

        <UpdateCartItemSize
          payload={{
            cartId,
            unitId: cartItem.unitId,
            sizeData: cartItem.unit.size,
          }}
        />

        <UpdateCartItemQuantity
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
*/
