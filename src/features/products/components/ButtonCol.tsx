'use client';

import { FC } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
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
    rowPayload: { defaultUnit },
  } = getRowPayload(info);

  const { mutate: updateQuantity } = useUpdateCartItemQuantity({});

  const { mutate: addToCart } = useAddToCart({
    customErrorHandling: async (error, variables) => {
      if (error.message.includes('item already in cart')) {
        const userId = session?.user.id;
        const cart = await fetchCart(userId);

        const cartItemToUpdate = cart?.items.find(
          (item) => item.unitId === variables
        );

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

  const handleAddToCart = () => {
    addToCart(defaultUnit.id);
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
