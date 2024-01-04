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

  const handleUnitChange = ({ event, rowIndex }: ChangeUnitHandlerProps) => {
    const selectedSize = event.target.value;

    const unit =
      productData[rowIndex].units.find(
        (unit: Unit) => unit.size === selectedSize
      ) || null;

    // set selected units to state when changing unit size value
    setSelectedUnits((prevSelectedUnits) => {
      const newSelectedUnits = [...prevSelectedUnits];
      newSelectedUnits[rowIndex] = unit;
      return newSelectedUnits;
    });
  };

  const handleAddToCart = ({ units, rowIndex }: CartHandlerProps) => {
    const selectedUnit = selectedUnits[rowIndex];

    if (selectedUnit) {
      // send selected unit to cart
      addToCart(selectedUnit.id);
    } else {
      // otherwise send the first unit instance
      const defaultUnit = units[0];
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
      enableColumnFilter: true,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('units', {
      header: 'Units',
      enableColumnFilter: false,
      cell: (info) => {
        const units = info.getValue();
        const rowIndex = info.row.index;

        return (
          <UnitSelect
            units={units}
            rowIndex={rowIndex}
            selectedUnits={selectedUnits}
            handleAddToCart={handleAddToCart}
            handleUnitChange={handleUnitChange}
          />
        );
      },
    }),
  ];

  const reactTable = useReactTable({
    data: productData,
    columns,
    enableFilters: true,
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <Table reactTable={reactTable} />
      <Pagination reactTable={reactTable} />
      <Meta reactTable={reactTable} />
    </div>
  );
}

function Table({ reactTable }: { reactTable: ReactTable<TableProduct> }) {
  return (
    <table>
      <thead>
        {reactTable.getHeaderGroups().map((headerGroup) => (
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
                        <NameFilter
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
        {reactTable.getRowModel().rows.map((row) => (
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
  );
}

function NameFilter({
  reactTable,
  column,
}: {
  reactTable: ReactTable<TableProduct>;
  column: Column<any, any>;
}) {
  const firstValue = reactTable
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  console.log('first value', firstValue);

  const columnFilterValue = column.getFilterValue();

  return firstValue === 'BLENDS' ? (
    <div className='w-full px-3'>
      <select
        name='category'
        id='category'
        className='font-normal w-full'
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={(columnFilterValue ?? '') as string}
      >
        <option value=''>SHOW ALL</option>
        <option value='BLENDS'>BLENDS</option>
        <option value='CIDERS'>CIDERS</option>
      </select>
    </div>
  ) : (
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

function Pagination({ reactTable }: { reactTable: ReactTable<TableProduct> }) {
  return (
    <div className='flex gap-6 mt-3'>
      <div className='flex gap-2'>
        <button
          className='border rounded p-1'
          onClick={() => reactTable.setPageIndex(0)}
          disabled={!reactTable.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => reactTable.previousPage()}
          disabled={!reactTable.getCanPreviousPage()}
        >
          {'<'}
        </button>

        <button
          className='border rounded p-1'
          onClick={() => reactTable.nextPage()}
          disabled={!reactTable.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className='border rounded p-1'
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

function Meta({ reactTable }: { reactTable: ReactTable<TableProduct> }) {
  return (
    <div className='mt-12'>
      <div>{reactTable.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(reactTable.getState().pagination, null, 2)}</pre>
    </div>
  );
}
