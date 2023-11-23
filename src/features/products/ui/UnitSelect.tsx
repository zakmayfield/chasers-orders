import { CartHandlerProps, Unit, UnitHandlerProps } from '@/types';
import AddToCartButton from './AddToCartButton';
import React from 'react';

interface UnitSelectProps {
  cartHandler: (props: CartHandlerProps) => void;
  unitHandler: (props: UnitHandlerProps) => void;
  data: Unit[];
  rowIndex: number;
  selectedUnits: Array<Unit | null>;
}

const UnitSelect: React.FC<UnitSelectProps> = ({
  cartHandler,
  unitHandler,
  data,
  rowIndex,
  selectedUnits,
}) => {
  const unitOptions = data.map((unitInfo) => (
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
        onChange={(event) => unitHandler({ event, rowIndex })}
      >
        {unitOptions}
      </select>

      <AddToCartButton handler={() => cartHandler({ data, rowIndex })} />
    </div>
  );
};

export default UnitSelect;
