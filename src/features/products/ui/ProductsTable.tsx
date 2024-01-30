'use client';
import React, { useState } from 'react';
import { Unit } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
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
import type { Product } from '../Products';
import { postUnitsToCart } from '@/store/cart.add';

export type CartHandlerProps = {
  units: Unit[];
  rowIndex: number;
};

export type ChangeUnitHandlerProps = {
  event: React.ChangeEvent<HTMLSelectElement>;
  rowIndex: number;
};

export default function ProductsTable({
  products: productData,
}: {
  products: Product[];
}) {
  // TODO: rework this logic: currently tracks and sets all available unit sizes - should be simplified to only allow single unit added to cart.
  // initialize selected units to same length as product data
  const [selectedUnits, setSelectedUnits] = useState<Array<Unit | null>>(
    Array(productData.length).fill(null)
  );

  const { mutate: addToCart } = useMutation({
    mutationFn: postUnitsToCart,
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

  const columnHelper = createColumnHelper<Product>();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      enableColumnFilter: true,
      cell: (info) => {
        return (
          <div className='w-80'>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap pl-3'>
              {info.getValue()}
            </div>
          </div>
        );
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
        const units = info.getValue();
        const rowIndex = info.row.index;

        return (
          <UnitColumn
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
      <div className='mx-auto w-3/4'>
        <Table reactTable={reactTable} />
        <Pagination reactTable={reactTable} />
      </div>
      {/* <Meta reactTable={reactTable} /> */}
    </div>
  );
}

function Table({ reactTable }: { reactTable: ReactTable<Product> }) {
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
  reactTable: ReactTable<Product>;
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

function Pagination({ reactTable }: { reactTable: ReactTable<Product> }) {
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

function Meta({ reactTable }: { reactTable: ReactTable<Product> }) {
  return (
    <div className='mt-12'>
      <div>{reactTable.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(reactTable.getState().pagination, null, 2)}</pre>
    </div>
  );
}
