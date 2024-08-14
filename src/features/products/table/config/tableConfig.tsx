'use client';
import { getColumnHelper, useTableConstructor } from '@/utils/table';
import {
  CategoryColumn,
  NameColumn,
  UnitsColumn,
} from '@/features/products/table/components/columns';
import { useGetFavorites } from '@/shared/hooks/queries';
import { ProductWithUnits } from '@/types/products';

export const useTableConfig = (data: ProductWithUnits[] | undefined) => {
  const { data: favorites } = useGetFavorites();
  const columnHelper = getColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      enableColumnFilter: true,
      cell: (info) => (
        <NameColumn
          info={info}
          isFavorite={
            !!favorites?.find(
              (favorite) => favorite.productId === info.row.original.id
            )
          }
        />
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      enableColumnFilter: true,
      cell: (info) => <CategoryColumn info={info} />,
    }),
    columnHelper.accessor('units', {
      id: 'cta',
      header: 'Size',
      enableColumnFilter: false,
      cell: (info) => <UnitsColumn info={info} />,
    }),
  ];

  const { tableConfig } = useTableConstructor(data, columns);

  return { tableConfig };
};
