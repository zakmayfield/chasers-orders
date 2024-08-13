'use client';
import { getColumnHelper, useTableConfig } from '@/utils/table';
import { ProductWithUnits } from '@/types/products';
import {
  CategoryColumn,
  NameColumn,
  UnitsColumn,
} from '@/features/products/table/components/columns';

export const getTableConfig = (data: ProductWithUnits[] | undefined) => {
  const columnHelper = getColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      enableColumnFilter: true,
      // cell: (info) => <NameColumn info={info} />,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      enableColumnFilter: true,
      // cell: (info) => <CategoryColumn info={info} />,
    }),
    columnHelper.accessor('units', {
      id: 'cta',
      header: 'Size',
      enableColumnFilter: false,
      cell: (info) => <UnitsColumn info={info} />,
    }),
  ];

  const { tableConfig } = useTableConfig(data, columns);

  return { tableConfig };
};
