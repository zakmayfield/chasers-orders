'use client';

import { ImSpinner2 } from 'react-icons/im';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { useFetchCartQuery } from './helpers.cart';
import { CartItem, LoadingItem } from './components';
import type { CartCache } from './types';

export const CartItems = () => {
  const { data, isFetching } = useFetchCartQuery();

  if (isFetching) {
    return <LoadingSkelly />;
  }

  if (data && data.items.length === 0) {
    return (
      <div>
        <ItemsHeader isFetching={isFetching} cart={data} />
        <EmptyItems />
      </div>
    );
  }

  return (
    <div>
      <ItemsHeader isFetching={isFetching} cart={data} />
      <ItemsContainer cart={data} />
    </div>
  );
};

function EmptyItems() {
  return (
    <div className='py-6 font-light flex items-center gap-3  '>
      <span>
        <MdOutlineRemoveShoppingCart />
      </span>
      <span>Your cart is empty</span>
    </div>
  );
}

function LoadingSkelly() {
  return (
    <div>
      {[1, 2].map((item) => (
        <LoadingItem key={item} />
      ))}
    </div>
  );
}

type ItemsHeaderProps = {
  isFetching: boolean;
  cart: CartCache | undefined;
};

function ItemsHeader({ isFetching, cart }: ItemsHeaderProps) {
  return (
    <div className='flex items-center gap-3'>
      <h4>Cart</h4>

      {isFetching ? (
        <ImSpinner2 className='animate-spin' />
      ) : (
        <p>
          (<span>{cart?.items.length}</span>)
        </p>
      )}
    </div>
  );
}

type ItemsContainerProps = {
  cart: CartCache | undefined;
};

function ItemsContainer({ cart }: ItemsContainerProps) {
  return (
    <div>
      {cart &&
        cart.items.map((item) => (
          <CartItem
            key={item.unitId}
            payload={{
              cartId: cart.id,
              cartItem: item,
            }}
          />
        ))}
    </div>
  );
}
