import React from 'react';
import AddToCartButton from './AddToCartButton';
import { CartHandlerProps, ChangeUnitHandlerProps } from './ProductsTable';
import { Unit } from '@prisma/client';

interface UnitColumnProps {
  handleAddToCart: (props: CartHandlerProps) => void;
  handleUnitChange: (props: ChangeUnitHandlerProps) => void;
  units: Unit[];
  rowIndex: number;
  selectedUnits: Array<Unit | null>;
}

const UnitColumn: React.FC<UnitColumnProps> = ({
  handleAddToCart,
  handleUnitChange,
  units,
  rowIndex,
  selectedUnits,
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

      <div className='w-20'>
        $
        {!selectedUnits[rowIndex]
          ? units[0].price.toFixed(2)
          : selectedUnits[rowIndex]?.price.toFixed(2)}
      </div>

      <AddToCartButton handler={() => handleAddToCart({ units, rowIndex })} />
    </div>
  );
};

export default UnitColumn;
