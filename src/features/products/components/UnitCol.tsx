'use client';

import { FC } from 'react';
import { getRowPayload } from '@/utils/helpers';
import { Unit } from '@prisma/client';
import { CellContext } from '@tanstack/react-table';
import type { ProductWithUnits } from '@/types/products';
import { useSizeCache } from '@/shared/hooks';

interface UnitColProps {
  info: CellContext<ProductWithUnits, Unit[]>;
}

export const UnitCol: FC<UnitColProps> = ({ info }) => {
  const {
    rowPayload: { defaultUnit, units, product },
  } = getRowPayload(info);

  const { getSizeCache, setSizeCache } = useSizeCache({
    productId: product.id,
  });

  const sizeCache = getSizeCache();

  const handleSizeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSizeCache(value);
  };

  const unitOptions = units.map((unitInfo) => (
    <option key={unitInfo.id} value={unitInfo.size}>
      {unitInfo.size}
    </option>
  ));

  return (
    <div className='flex gap-12 items-center w-full'>
      <select
        value={sizeCache ? sizeCache : defaultUnit.size}
        onChange={handleSizeSelect}
        className='w-24 rounded'
      >
        {unitOptions}
      </select>
    </div>
  );
};
