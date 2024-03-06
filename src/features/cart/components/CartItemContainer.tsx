'use client';

import { CartItem } from './CartItem';
import { ImSpinner2 } from 'react-icons/im';
import { CartItemLoadingSkeleton } from './index';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { useFetchCartQuery } from '../helpers.cart';
import { CartCache } from '../types';

export const CartItemContainer = () => {
  const { data, isFetching } = useFetchCartQuery();

  return (
    <div className='col-start-3 col-span-4'>
      <CartItemsContainerHeader isFetching={isFetching} cart={data} />
      {data && data.items.length === 0 && <EmptyItemContainer />}
      {isFetching ? <ContainerLoadingSkelly /> : <CartItems cart={data} />}
    </div>
  );
};

function EmptyItemContainer() {
  return (
    <div className='border-t py-6 font-light flex items-center gap-3  '>
      <span>
        <MdOutlineRemoveShoppingCart />
      </span>
      <span>Your cart is empty</span>
    </div>
  );
}

function ContainerLoadingSkelly() {
  return (
    <div>
      {[1, 2].map((item) => (
        <CartItemLoadingSkeleton key={item} />
      ))}
    </div>
  );
}

type CartItemsContainerHeaderProps = {
  isFetching: boolean;
  cart: CartCache | undefined;
};

function CartItemsContainerHeader({
  isFetching,
  cart,
}: CartItemsContainerHeaderProps) {
  return (
    <div className='flex items-center gap-3'>
      <h4 className=' text-2xl font-extralight'>
        <span>Cart</span>
      </h4>

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

type CartItemsProps = {
  cart: CartCache | undefined;
};

function CartItems({ cart }: CartItemsProps) {
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
