'use client';

import React from 'react';
import { NameCol, CategoryCol, ButtonCol } from './components';
import { Pagination, Table, TableLoadingSkeleton } from './components/table';
import { useCustomQuery } from '@/shared/hooks/queries';
import { getProducts } from '@/services/queries/getProducts';
import { useFavorites } from '@/features/products/helpers.products';
import { getColumnHelper, useTableConfig } from '@/utils/helpers';
import { QueryKeys } from '@/types/hooks';

export const ProductsTable = () => {
  const { data, isFetching } = useCustomQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: getProducts,
    staleTime: Infinity,
  });

  // evoke here because remove favorite (NameCol) is broken without it
  const {} = useFavorites({});

  const columnHelper = getColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      enableColumnFilter: true,
      cell: (info) => <NameCol info={info} />,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      enableColumnFilter: true,
      cell: (info) => <CategoryCol info={info} />,
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
