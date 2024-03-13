'use client';

import { FC } from 'react';
import { ProductWithUnits } from '@/features/products/types';
import {
  getRowPayload,
  useSizeCache,
} from '@/features/products/helpers.products';
import { Unit, UnitsOnCart } from '@prisma/client';
import { CellContext } from '@tanstack/react-table';
import { BsCartPlus } from 'react-icons/bs';
import { useToast } from '@/hooks/general.hooks';
import {
  useAddToCartMutation,
  useUpdateQuantity,
} from '@/features/cart/helpers.cart';
import { useSession } from 'next-auth/react';
import { fetchCart } from '@/features/cart/utils.cart';

interface ButtonColProps {
  info: CellContext<ProductWithUnits, Unit[]>;
}

export const ButtonCol: FC<ButtonColProps> = ({ info }) => {
  const { data: session } = useSession();
  const { notify } = useToast();

  const {
    rowPayload: { defaultUnit, units, product },
  } = getRowPayload(info);

  const { sizeQuery, sizeMutation } = useSizeCache({
    productId: product.id,
  });

  const { updateQuantity } = useUpdateQuantity({
    onSuccessCallback(data) {
      console.info(data);
      notify(`Updated quantity to (${data.quantity})`);
    },
    onErrorCallback() {
      notify('Unable to update quantity', 'error');
    },
  });

  function updateQuantityCallback(updateQuantityPayload: {
    cartId: string;
    unitId: string;
    quantityPayload: number;
  }) {
    updateQuantity(updateQuantityPayload);
  }

  const { addToCartMutation } = useAddToCartMutation({
    onSuccessCallback() {
      notify('Item added to cart');
    },
    async onErrorCallback(error, variables) {
      if (error instanceof Error) {
        if (error.message.includes('item already in cart')) {
          // fetch cart from server use userId
          const userId = session?.user.id;
          const cart = await fetchCart(userId);

          // find CartItem to update
          const cartItemToUpdate = cart?.items.find(
            (item) => item.unitId === variables
          );

          // evoke update quantity mutation
          if (cart && cartItemToUpdate) {
            const item = cartItemToUpdate as Omit<UnitsOnCart, 'createdAt'>;
            const updatedQuantity = item.quantity + 1;

            updateQuantityCallback({
              cartId: cartItemToUpdate.cartId,
              unitId: cartItemToUpdate.unitId,
              quantityPayload: updatedQuantity,
            });
          }

          // return before error notification
          return;
        }

        notify(error.message, 'error');
      }
    },
  });

  const handleAddToCart = async () => {
    const { sizeCache } = sizeQuery();

    function setToCacheAndReturnUnit(size: string) {
      sizeMutation(size);
      const unit = units[0];
      return unit;
    }

    if (!sizeCache) {
      const unit = setToCacheAndReturnUnit(defaultUnit.size);
      addToCartMutation(unit.id);
      return;
    }
    const unit = units.find((unit) => unit.size === sizeCache);
    addToCartMutation(unit!.id);
    return;
  };

  return (
    <div>
      <button
        className={`w-12 text-xl p-1 flex justify-center rounded text-slate-700 hover:bg-slate-50`}
        onClick={handleAddToCart}
      >
        <BsCartPlus />
      </button>
    </div>
  );
};
