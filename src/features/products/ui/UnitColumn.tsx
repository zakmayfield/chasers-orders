import { CartHandlerProps, Unit, ChangeUnitHandlerProps } from '@/types';
import AddToCartButton from './AddToCartButton';
import React from 'react';

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
    <div className='flex justify-between'>
      <select
        value={
          // set row select value to selected unit size
          selectedUnits[rowIndex] ? selectedUnits[rowIndex]?.size : ''
        }
        onChange={(event) => handleUnitChange({ event, rowIndex })}
      >
        {unitOptions}
      </select>

      <div>
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
