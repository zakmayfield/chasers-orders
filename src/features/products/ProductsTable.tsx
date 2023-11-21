'use client';
import { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import type { Product, Unit } from '@/types';

type TableProduct = Product;

export default function ProductsTable({
  products: productData,
}: {
  products: Product[];
}) {
  // initialize selected units to length of product data
  const [selectedUnits, setSelectedUnits] = useState<Array<Unit | null>>(
    Array(productData.length).fill(null)
  );

  const columnHelper = createColumnHelper<TableProduct>();

  // set selected units to state when changing size value
  const handleUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    rowIndex: number
  ) => {
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
  const handleAddToCart = (data: Unit[], rowIndex: number) => {
    const selectedUnit = selectedUnits[rowIndex];

    if (selectedUnit) {
      console.log('Adding to cart:', selectedUnit);
    } else {
      const defaultUnit = data[0];
      console.log('default unit ->', defaultUnit);
    }
  };

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('units', {
      header: 'Units',
      cell: (info) => {
        const data = info.getValue();
        const rowIndex = info.row.index;

        const unitOptions = data.map((unitInfo) => (
          <option key={unitInfo.id} value={unitInfo.size}>
            {unitInfo.size}
          </option>
        ));

        return (
          <div className='flex justify-between'>
            <select
              value={
                // set row select value to selected unit size
                selectedUnits[rowIndex] ? selectedUnits[rowIndex]?.size : ''
              }
              onChange={(e) => handleUnitChange(e, rowIndex)}
            >
              {unitOptions}
            </select>

            <button onClick={() => handleAddToCart(data, rowIndex)}>
              Add to Cart
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: productData,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
    </div>
  );
}
