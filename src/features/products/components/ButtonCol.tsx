'use client';

import { FC } from 'react';
import { UnitsOnCartCacheType } from '@/features/cart/types';
import { ProductWithUnits } from '@/features/products/types';
import {
  getRowPayload,
  useSizeCache,
} from '@/features/products/helpers.products';
import { Unit } from '@prisma/client';
import { UseMutateFunction } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import { BsCartPlus } from 'react-icons/bs';

interface ButtonColProps {
  info: CellContext<ProductWithUnits, Unit[]>;
  addToCartMutation: UseMutateFunction<
    UnitsOnCartCacheType,
    unknown,
    string,
    unknown
  >;
}

export const ButtonCol: FC<ButtonColProps> = ({ info, addToCartMutation }) => {
  const {
    rowPayload: { defaultUnit, units, product },
  } = getRowPayload(info);

  const { sizeQuery, sizeMutation } = useSizeCache({
    productId: product.id,
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
