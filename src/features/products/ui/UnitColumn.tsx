'use client';

import React from 'react';
import { Unit } from '@prisma/client';
import { HandleUnitChangeProps } from './ProductsTable';

interface UnitColumnProps {
  handleAddToCart: () => void;
  handleUnitChange: (props: HandleUnitChangeProps) => void;
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
        value={selectedUnits[rowIndex] ? selectedUnits[rowIndex]?.size : ''}
        onChange={(event) => handleUnitChange({ event, rowIndex })}
        className='w-24 rounded'
      >
        {unitOptions}
      </select>

      <button
        // TODO: Currently disabling all add to cart buttons on the table, need to isolate
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
