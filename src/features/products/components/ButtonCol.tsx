'use client';

import { FC } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { useSizeCache } from '@/features/products/helpers.products';
import { fetchCart } from '@/utils/cart';
import { getRowPayload } from '@/utils/helpers';
import {
  useAddToCart,
  useUpdateCartItemQuantity,
} from '@/shared/hooks/mutations';
import { CellContext } from '@tanstack/react-table';
import { Unit, UnitsOnCart } from '@prisma/client';
import { ProductWithUnits } from '@/types/products';

interface ButtonColProps {
  info: CellContext<ProductWithUnits, Unit[]>;
}

export const ButtonCol: FC<ButtonColProps> = ({ info }) => {
  const { data: session } = useSession();

  const {
    rowPayload: { defaultUnit, units, product },
  } = getRowPayload(info);

  const { sizeQuery, sizeMutation } = useSizeCache({
    productId: product.id,
  });

  const { mutate: updateQuantity } = useUpdateCartItemQuantity({});

  const { mutate: addToCart } = useAddToCart({
    customErrorHandling: async (error, variables) => {
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

          // TODO: update cart cache to included new quantity
          updateQuantity({
            cartId: cartItemToUpdate.cartId,
            unitId: cartItemToUpdate.unitId,
            quantity: updatedQuantity,
          });
        }
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
      addToCart(unit.id);
      return;
    }
    const unit = units.find((unit) => unit.size === sizeCache);
    addToCart(unit!.id);
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
