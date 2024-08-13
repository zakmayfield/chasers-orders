'use client';
import { getColumnHelper, useTableConfig } from '@/utils/table';
import { ProductWithUnits } from '@/types/products';

export const getTableConfig = (data: ProductWithUnits[] | undefined) => {
  const columnHelper = getColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      enableColumnFilter: true,
      // cell: (info) => <NameCol info={info} />,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      enableColumnFilter: true,
      // cell: (info) => <CategoryCol info={info} />,
    }),
    columnHelper.accessor('units', {
      id: 'cta',
      header: 'Size',
      enableColumnFilter: false,
      // cell: (info) => <ButtonCol info={info} />,
    }),
  ];

  const { tableConfig } = useTableConfig(data, columns);

  return { tableConfig };
};
