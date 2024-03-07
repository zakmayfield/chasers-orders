'use client';

import { FC } from 'react';
import { Unit } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import {
  getRowPayload,
  useSizeCache,
} from '@/features/products/helpers.products';
import type { ProductWithUnits } from '@/features/products/types';

interface UnitColProps {
  info: CellContext<ProductWithUnits, Unit[]>;
}

export const UnitCol: FC<UnitColProps> = ({ info }) => {
  const queryClient = useQueryClient();

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

  async function mutateSizeCacheCallback(value: string) {
    queryClient.setQueryData(['size', product.id], value);
  }

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
