'use client';

import React from 'react';
import {
  useFetchProductsQuery,
  getColumnHelper,
  useTableConfig,
  useFavoritesQuery,
} from '@/features/products/helpers.products';
import { NameCol, CategoryCol, UnitCol, ButtonCol } from './components';
import { Pagination, Table, TableLoadingSkeleton } from './components/table';

export const ProductsTable = () => {
  const { data, isFetching } = useFetchProductsQuery();
  const { isLoading, favorites } = useFavoritesQuery();

  const columnHelper = getColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      enableColumnFilter: true,
      cell: (info) => (
        <NameCol info={info} isLoading={isLoading} favorites={favorites} />
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      enableColumnFilter: true,
      cell: (info) => <CategoryCol info={info} />,
    }),
    columnHelper.accessor('units', {
      header: 'Size',
      enableColumnFilter: false,
      cell: (info) => <UnitCol info={info} />,
    }),
    columnHelper.accessor('units', {
      id: 'cta',
      header: '',
      enableColumnFilter: false,
      cell: (info) => <ButtonCol info={info} />,
    }),
  ];

  const { reactTable } = useTableConfig(data, columns);

  return (
    <div className='mx-auto w-3/4'>
      {isFetching ? (
        <TableLoadingSkeleton />
      ) : (
        <Table reactTable={reactTable} />
      )}

      <Pagination reactTable={reactTable} isFetching={isFetching} />
    </div>
  );
};
