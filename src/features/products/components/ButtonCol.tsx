'use client';

import { FC } from 'react';
import { ProductWithUnits } from '@/features/products/types';
import {
  getRowPayload,
  useAddToCartMutation,
  useSizeCache,
} from '@/features/products/helpers.products';
import { Unit } from '@prisma/client';
import { CellContext } from '@tanstack/react-table';
import { BsCartPlus } from 'react-icons/bs';
import { useToast } from '@/hooks/general.hooks';

interface ButtonColProps {
  info: CellContext<ProductWithUnits, Unit[]>;
}

export const ButtonCol: FC<ButtonColProps> = ({ info }) => {
  const { notify } = useToast();

  const {
    rowPayload: { defaultUnit, units, product },
  } = getRowPayload(info);

  const { sizeQuery, sizeMutation } = useSizeCache({
    productId: product.id,
  });

  const { addToCartMutation } = useAddToCartMutation({
    onSuccessCallback() {
      notify('Item added to cart');
    },
    onErrorCallback(error) {
      if (error instanceof Error) {
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
