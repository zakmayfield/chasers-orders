'use client';
import { getColumnHelper, useTableConstructor } from '@/utils/table';
import {
  CategoryColumn,
  NameColumn,
  UnitsColumn,
} from '@/app/products/components/table/components/columns';
import { useGetFavorites } from '@/shared/hooks/data';
import { TProductWithVariants } from '@/shared/types/Product';

export const useTableConfig = (data: TProductWithVariants[]) => {
  // const { data: favorites } = useGetFavorites();
  const columnHelper = getColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      enableColumnFilter: true,
      // cell: (info) => (
      //   <NameColumn
      //     info={info}
      //     isFavorite={
      //       !!favorites?.find(
      //         (favorite) => favorite.productId === info.row.original.id
      //       )
      //     }
      //   />
      // ),
    }),
    columnHelper.accessor('category.name', {
      header: 'Category',
      enableColumnFilter: true,
      cell: (info) => <CategoryColumn info={info} />,
    }),
    columnHelper.accessor('variants', {
      id: 'cta',
      header: '',
      enableColumnFilter: false,
      // cell: (info) => <UnitsColumn info={info} />,
    }),
  ];

  const { tableConfig } = useTableConstructor(data, columns);

  return { tableConfig };
};
