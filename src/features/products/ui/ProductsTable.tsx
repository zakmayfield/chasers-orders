'use client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postUnitsToCart } from '@/store';
import UnitSelect from './UnitSelect';
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
import type {
  CartHandlerProps,
  Product,
  Unit,
  ChangeUnitHandlerProps,
} from '@/types';

type TableProduct = Product;

export default function ProductsTable({
  products: productData,
}: {
  products: Product[];
}) {
  // initialize selected units to same length as product data
  const [selectedUnits, setSelectedUnits] = useState<Array<Unit | null>>(
    Array(productData.length).fill(null)
  );

  const { mutate: addToCart } = useMutation({
    mutationFn: postUnitsToCart,
    onError: (err) => {
      if (err) {
        console.log('(ProductsTable | mutation) Error: ', err);
      }
    },
  });

  // set selected units to state when changing size value
  const handleUnitChange = ({ event, rowIndex }: ChangeUnitHandlerProps) => {
    const selectedSize = event.target.value;
    const unit =
      productData[rowIndex].units.find(
        (unit: Unit) => unit.size === selectedSize
      ) || null;

    setSelectedUnits((prevSelectedUnits) => {
      const newSelectedUnits = [...prevSelectedUnits];
      newSelectedUnits[rowIndex] = unit;
      return newSelectedUnits;
    });
  };

  // send selected unit to cart
  // otherwise send the first unit instance
  const handleAddToCart = ({ data, rowIndex }: CartHandlerProps) => {
    const selectedUnit = selectedUnits[rowIndex];

    if (selectedUnit) {
      addToCart(selectedUnit.id);
    } else {
      const defaultUnit = data[0];
      addToCart(defaultUnit.id);
    }
  };

  const columnHelper = createColumnHelper<TableProduct>();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      enableColumnFilter: true,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      enableColumnFilter: false,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('units', {
      header: 'Units',
      enableColumnFilter: false,
      cell: (info) => {
        const data = info.getValue();
        const rowIndex = info.row.index;

        return (
          <UnitSelect
            cartHandler={handleAddToCart}
            changeUnitHandler={handleUnitChange}
            data={data}
            rowIndex={rowIndex}
            selectedUnits={selectedUnits}
          />
        );
      },
    }),
  ];

  const table = useReactTable({
    data: productData,
    columns,
    enableFilters: true,
    enableColumnFilters: true,
    debugAll: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <h1>products table</h1>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className='flex gap-6 mt-3'>
        <div className='flex gap-2'>
          <button
            className='border rounded p-1'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className='border rounded p-1'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>

          <button
            className='border rounded p-1'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className='border rounded p-1'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
      </div>

      {/* Meta Data */}
      <div className='mt-12'>
        <div>{table.getRowModel().rows.length} Rows</div>
        <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
      </div>
    </div>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: ReactTable<Product>;
}) {
  const columnFilterValue = column.getFilterValue();

  return (
    <div className='w-full px-3'>
      <input
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className='border shadow rounded font-normal w-full'
      />
    </div>
  );
}
