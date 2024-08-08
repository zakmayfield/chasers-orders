'use client';

import { FC } from 'react';
import { useSizeCache } from '@/features/products/helpers.products';
import { getRowPayload } from '@/utils/helpers';
import { Unit } from '@prisma/client';
import { CellContext } from '@tanstack/react-table';
import type { ProductWithUnits } from '@/types/products';

interface UnitColProps {
  info: CellContext<ProductWithUnits, Unit[]>;
}

export const UnitCol: FC<UnitColProps> = ({ info }) => {
  const {
    rowPayload: { defaultUnit, units, product },
  } = getRowPayload(info);

  const { sizeQuery, sizeMutation } = useSizeCache({
    productId: product.id,
  });

  const { sizeCache } = sizeQuery();

  const handleSizeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    sizeMutation(value);
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
