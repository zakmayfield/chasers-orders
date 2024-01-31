'use client';

import React from 'react';
import { Unit } from '@prisma/client';
import { CartHandlerProps, ChangeUnitHandlerProps } from './ProductsTable';

interface UnitColumnProps {
  handleAddToCart: () => void;
  handleUnitChange: (props: ChangeUnitHandlerProps) => void;
  units: Unit[];
  rowIndex: number;
  selectedUnits: Array<Unit | null>;
  isLoading: boolean;
}

const UnitColumn: React.FC<UnitColumnProps> = ({
  handleAddToCart,
  handleUnitChange,
  units,
  rowIndex,
  selectedUnits,
  isLoading,
}) => {
  const unitOptions = units.map((unitInfo) => (
    <option key={unitInfo.id} value={unitInfo.size}>
      {unitInfo.size}
    </option>
  ));

  return (
    <div className='flex gap-6 items-center w-full'>
      <select
        value={
          // set row select value to selected unit size
          selectedUnits[rowIndex] ? selectedUnits[rowIndex]?.size : ''
        }
        onChange={(event) => handleUnitChange({ event, rowIndex })}
        className='w-24 rounded'
      >
        {unitOptions}
      </select>

      <button
        disabled={isLoading}
        className={`w-24 border text-sm py-1 rounded ${
          isLoading && 'opacity-25'
        }`}
        onClick={() => handleAddToCart()}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default UnitColumn;
