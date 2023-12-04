'use client';
import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useMutation } from '@tanstack/react-query';
import { postUnitsToCart } from '@/store';
import type {
  CartHandlerProps,
  Product,
  Unit,
  ChangeUnitHandlerProps,
} from '@/types';
import UnitSelect from './UnitSelect';

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

  const columnHelper = createColumnHelper<TableProduct>();

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
