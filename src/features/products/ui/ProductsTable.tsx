'use client';

import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Table as ReactTable,
  useReactTable,
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import UnitColumn from './UnitColumn';
import { categoryData as categories } from '../categories';
import type { ProductWithUnits } from '@/types/types.product';
import { addItem } from '@/services/mutations/cart.addItem';
import { useToast } from '@/hooks/general.hooks';
import { CartCache } from '@/types/types.cart';
import NameCell from './NameCell';
import { getRowPayload } from '@/utils/products.table.utils';
import { getProducts } from '@/services/queries/products.getProducts';
import { useFavoritesQuery } from '@/hooks/query.hooks';

export default function ProductsTable() {
  // tools
  const queryClient = useQueryClient();
  const { notify } = useToast();

  // data
  const { favorites } = useFavoritesQuery();

  const { data } = useQuery<ProductWithUnits[], Error>({
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
      cell: (info) => {
        return <NameCell favorites={favorites} info={info} />;
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      enableColumnFilter: true,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('units', {
      header: 'Size',
      enableColumnFilter: false,
      cell: (info) => {
        const { rowPayload } = getRowPayload(info);

        return (
          <UnitColumn
            rowPayload={rowPayload}
            addToCartMutation={addToCartMutation}
          />
        );
      },
    }),
  ];

  const reactTable = useReactTable({
    data: data ? data : [],
    columns,
    enableFilters: true,
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className='mx-auto w-3/4'>
        <Table reactTable={reactTable} />

        <Pagination reactTable={reactTable} />
      </div>
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
              <th key={header.id} className='text-left align-top pb-6'>
                {header.isPlaceholder ? null : (
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanFilter() ? (
                      <div className='mt-3'>
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
        {reactTable.getRowModel().rows.length > 0 ? (
          reactTable.getRowModel().rows.map((row) => (
            <tr key={row.id} className='even:bg-gray-100'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='py-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td className='p-3' colSpan={reactTable.getHeaderGroups().length}>
              No products found
            </td>
          </tr>
        )}
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
}: {
  reactTable: ReactTable<ProductWithUnits>;
}) {
  return (
    <div className='flex gap-6 mt-6'>
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
          onClick={() => reactTable.setPageIndex(reactTable.getPageCount() - 1)}
          disabled={!reactTable.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>
      <span className='flex items-center gap-1'>
        <div>Page</div>
        <strong>
          {reactTable.getState().pagination.pageIndex + 1} of{' '}
          {reactTable.getPageCount()}
        </strong>
      </span>
    </div>
  );
}
