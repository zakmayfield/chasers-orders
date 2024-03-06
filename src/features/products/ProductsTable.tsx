'use client';

import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/general.hooks';
import { useFavoritesQuery } from '@/hooks/query.hooks';
import { useTableConfig } from '@/features/products/helpers.products';

import { NameCol, CategoryCol, UnitCol, ButtonCol } from './components';
import {
  getColumnHelper,
  useAddToCartMutation,
  useFetchProductsQuery,
} from '@/features/products/helpers.products';

import type { CartCache } from '@/features/cart/types';
import { Pagination, Table, TableLoadingSkeleton } from './components/table';

export const ProductsTable = () => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { favorites } = useFavoritesQuery();
  const { data, isLoading, isFetching } = useFetchProductsQuery();

  const { addToCartMutation } = useAddToCartMutation({
    onSuccessCallback(data) {
      notify('Item added to cart');

      // Update `cart` items cache with data from response
      queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) =>
        oldData
          ? {
              ...oldData,
              items: [data, ...oldData.items],
            }
          : oldData
      );
    },
    onErrorCallback(error) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
  });

  const columnHelper = getColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      enableColumnFilter: true,
      cell: (info) => (
        <NameCol favorites={favorites} info={info} isLoading={isLoading} />
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
      cell: (info) => (
        <ButtonCol info={info} addToCartMutation={addToCartMutation} />
      ),
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
