'use client';

import React, { useEffect, useState } from 'react';
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { UnitsOnCartCacheType } from '@/types/types.cart';
import { RowPayload } from '@/utils/products.table.utils';

interface UnitColumnProps {
  rowPayload: RowPayload;
  addToCartMutation: UseMutateFunction<
    UnitsOnCartCacheType,
    unknown,
    string,
    unknown
  >;
}

const UnitColumn: React.FC<UnitColumnProps> = ({
  addToCartMutation,
  rowPayload,
}) => {
  const { defaultUnit, units, product } = rowPayload;
  const queryClient = useQueryClient();

  const sizeCache: string | undefined = queryClient.getQueryData([
    'size',
    product.id,
  ]);

  const { mutate: setColumnSizeCache } = useMutation({
    mutationFn: async (value: string) => {
      queryClient.setQueryData(['size', product.id], value);
    },
  });

  // TODO: add to cart is broken
  const handleAddToCart = async () => {
    const unit = units.find((unit) => unit.size === sizeCache);
    console.log('unit', unit);
    addToCartMutation(unit!.id);
  };

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

export default UnitColumn;
