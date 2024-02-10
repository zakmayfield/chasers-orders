'use client';

import React from 'react';
import { HandleUnitChangeProps } from './ProductsTable';
import { UseMutateFunction } from '@tanstack/react-query';
import { UnitsOnCartCacheType } from '@/types/types.cart';
import { RowPayload } from '@/utils/products/products.table';

interface UnitColumnProps {
  handleUnitChange: (props: HandleUnitChangeProps) => void;
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
  handleUnitChange,
  rowPayload,
}) => {
  const { rowIndex, units, unit } = rowPayload;

  const handleAddToCart = () => {
    addToCartMutation(unit!.id);
  };

  const unitOptions = units.map((unitInfo) => (
    <option key={unitInfo.id} value={unitInfo.size}>
      {unitInfo.size}
    </option>
  ));

  return (
    <div className='flex gap-6 items-center w-full'>
      <select
        value={unit!.size}
        onChange={(event) => handleUnitChange({ event, rowIndex })}
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
