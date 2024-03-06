'use client';

import React from 'react';
import { Unit } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import { getRowPayload } from '@/utils/products.table.utils';
import { ProductWithUnits } from '@/features/products/types';

interface UnitColumnProps {
  info: CellContext<ProductWithUnits, Unit[]>;
}

export const UnitCol: React.FC<UnitColumnProps> = ({ info }) => {
  const queryClient = useQueryClient();

  const { rowPayload } = getRowPayload(info);
  const { defaultUnit, units, product } = rowPayload;

  const sizeCache: string | undefined = queryClient.getQueryData([
    'size',
    product.id,
  ]);

  const { mutate: setColumnSizeCache } = useMutation({
    mutationFn: async (value: string) => {
      queryClient.setQueryData(['size', product.id], value);
    },
  });

  const handleSizeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setColumnSizeCache(value);
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
