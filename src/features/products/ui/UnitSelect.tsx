import { CartHandlerProps, Unit, ChangeUnitHandlerProps } from '@/types';
import AddToCartButton from './AddToCartButton';
import React from 'react';

interface UnitSelectProps {
  handleAddToCart: (props: CartHandlerProps) => void;
  handleUnitChange: (props: ChangeUnitHandlerProps) => void;
  units: Unit[];
  rowIndex: number;
  selectedUnits: Array<Unit | null>;
}

const UnitSelect: React.FC<UnitSelectProps> = ({
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

      <AddToCartButton handler={() => handleAddToCart({ units, rowIndex })} />
    </div>
  );
};

export default UnitSelect;
