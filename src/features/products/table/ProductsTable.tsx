'use client';

import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Table as ReactTable,
  Column,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { tableConfig, getRowPayload } from '@/utils/products.table.utils';
import { NameCol, CategoryCol, UnitCol } from './columns';
import { categoryData as categories } from '../categories';
import type { ProductWithUnits } from '@/types/types.product';
import { CartCache } from '@/types/types.cart';
import { addItem } from '@/services/mutations/cart.addItem';
import { useToast } from '@/hooks/general.hooks';
import { useFavoritesQuery } from '@/hooks/query.hooks';
import { getProducts } from '@/services/queries/products.getProducts';
import { ImSpinner2 } from 'react-icons/im';

export default function ProductsTable() {
  // tools
  const queryClient = useQueryClient();
  const { notify } = useToast();

  // data
  const { favorites } = useFavoritesQuery();

  const { data, isLoading, isFetching } = useQuery<ProductWithUnits[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: Infinity,
  });

  const { mutate: addToCartMutation } = useMutation({
    mutationFn: addItem,
    onSuccess(data) {
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
    onError(error) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
  });

  // table config
  const columnHelper = createColumnHelper<ProductWithUnits>();

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
      cell: (info) => (
        <UnitCol info={info} addToCartMutation={addToCartMutation} />
      ),
    }),
  ];

  const { reactTable } = tableConfig(data, columns);

  // TODO: Rework the table loading states
  // Headers and Pagination should render as normal, utilizing spinners for loading data
  // Body will render either a spinner or the data - be aware of a possible UI bug where the body content doesn't stretch the width of the whole table: 🤷
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
}

function TableLoadingSkeleton() {
  return (
    <div className='mt-24'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
        return (
          <div
            key={item}
            className='h-[45px] w-3/4 mx-auto even:bg-gray-100 animate-pulse'
          ></div>
        );
      })}
    </div>
  );
}

function Table({ reactTable }: { reactTable: ReactTable<ProductWithUnits> }) {
  return (
    <table className='w-full'>
      <thead>
        {reactTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className='text-left font-extralight align-top pb-6'
              >
                {header.isPlaceholder ? null : (
                  <div className='text-2xl'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanFilter() ? (
                      <div className='mt-3 text-base'>
                        <Filter
                          reactTable={reactTable}
                          column={header.column}
                        />
                      </div>
                    ) : null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {reactTable.getRowModel().rows.length > 0 &&
          reactTable.getRowModel().rows.map((row) => (
            <tr key={row.id} className='even:bg-gray-100'>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id} className='py-2'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function Filter({
  reactTable,
  column,
}: {
  reactTable: ReactTable<ProductWithUnits>;
  column: Column<any, any>;
}) {
  const firstValue = reactTable
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return firstValue === 'BLENDS' ? (
    <div className='w-full'>
      <select
        name='category'
        id='category'
        className='font-normal rounded border py-1'
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={(columnFilterValue ?? '') as string}
      >
        <option value=''>SHOW ALL</option>
        {categories.map((cat) => {
          let formattedCat = cat.toUpperCase();
          return (
            <option key={cat} value={formattedCat}>
              {formattedCat}
            </option>
          );
        })}
      </select>
    </div>
  ) : (
    <div className='w-full'>
      <input
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className='border rounded font-normal w-3/4 py-1 pl-1'
      />
    </div>
  );
}

function Pagination({
  reactTable,
  isFetching,
}: {
  reactTable: ReactTable<ProductWithUnits>;
  isFetching?: boolean;
}) {
  return (
    <div className='flex justify-between gap-6 mt-6'>
      {/* Next/Previous Pagination */}
      <div className='flex items-center gap-6'>
        <div className='flex gap-2'>
          <button
            className={`border rounded p-1 ${
              !reactTable.getCanPreviousPage()
                ? 'opacity-50'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => reactTable.setPageIndex(0)}
            disabled={!reactTable.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className={`border rounded p-1 ${
              !reactTable.getCanPreviousPage()
                ? 'opacity-50'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => reactTable.previousPage()}
            disabled={!reactTable.getCanPreviousPage()}
          >
            {'<'}
          </button>

          <button
            className={`border rounded p-1 ${
              !reactTable.getCanNextPage()
                ? 'opacity-50'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => reactTable.nextPage()}
            disabled={!reactTable.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className={`border rounded p-1 ${
              !reactTable.getCanNextPage()
                ? 'opacity-50'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() =>
              reactTable.setPageIndex(reactTable.getPageCount() - 1)
            }
            disabled={!reactTable.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          {isFetching ? (
            <strong className='flex items-center gap-2'>
              1 of
              <ImSpinner2 className='animate-spin' />
            </strong>
          ) : (
            <strong>
              {reactTable.getState().pagination.pageIndex + 1} of{' '}
              {reactTable.getPageCount()}
            </strong>
          )}
        </span>
      </div>

      {/* TODO: Fix this hydration error. Can render this select but don't know if this will have any bug implications. If there is a bug with the show x, then check here. */}
      {/* Show X Amount */}
      <div>
        <select
          value={reactTable.getState().pagination.pageSize}
          onChange={(e) => {
            reactTable.setPageSize(Number(e.target.value));
          }}
          className='border rounded p-2 font-extralight'
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show <span className='font-normal'>{pageSize}</span>
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
