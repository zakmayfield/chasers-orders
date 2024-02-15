'use client';

import React, { useEffect, useState } from 'react';
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { UnitsOnCartCacheType } from '@/types/types.cart';
import { RowPayload, getRowPayload } from '@/utils/products.table.utils';
import { CellContext } from '@tanstack/react-table';
import { ProductWithUnits } from '@/types/types.product';
import { Unit } from '@prisma/client';

interface UnitColumnProps {
  info: CellContext<ProductWithUnits, Unit[]>;
  addToCartMutation: UseMutateFunction<
    UnitsOnCartCacheType,
    unknown,
    string,
    unknown
  >;
}

export const UnitCol: React.FC<UnitColumnProps> = ({
  info,
  addToCartMutation,
}) => {
  const queryClient = useQueryClient();

  const { rowPayload } = getRowPayload(info);
  const { defaultUnit, units, product } = rowPayload;

  const sizeCache: string | undefined = queryClient.getQueryData([
    'size',
    product.id,
  ]);

  const { mutate: setColumnSizeCache } = useMutation({
    mutationFn: async (value: string) => {
      queryClient.setQueryData(['size', product.id], value);
    },
  });

  const handleAddToCart = async () => {
    if (!sizeCache) {
      const unit = setToCacheAndReturnUnit(defaultUnit.size);
      addToCartMutation(unit.id);
      return;
    }
    const unit = units.find((unit) => unit.size === sizeCache);
    addToCartMutation(unit!.id);
    return;
  };

  function setToCacheAndReturnUnit(size: string) {
    setColumnSizeCache(size);
    const unit = units[0];
    return unit;
  }

  const handleSizeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setColumnSizeCache(value);
  };

  const unitOptions = units.map((unitInfo) => (
    <option key={unitInfo.id} value={unitInfo.size}>
      {unitInfo.size}
    </option>
  ));

  return (
    <div className='flex gap-6 items-center w-full'>
      <select
        value={sizeCache ? sizeCache : defaultUnit.size}
        onChange={handleSizeSelect}
        className='w-24 rounded'
      >
        {unitOptions}
      </select>

      <button
        className={`w-24 border text-sm py-1 rounded`}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};
