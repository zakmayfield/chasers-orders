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
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const columnHelper = createColumnHelper<TableProduct>();

  const handleUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    data: Unit[]
  ) => {
    const selectedSize = event.target.value;
    const unit = data.find((unit: Unit) => unit.size === selectedSize) || null;
    setSelectedUnit(unit);
  };

  const handleAddToCart = () => {
    if (selectedUnit) {
      console.log('Adding to cart:', selectedUnit);
      // Add your actual logic for adding to the cart here
    } else {
      console.log('Please select a unit before adding to cart.');
    }
  };

  useEffect(() => {
    selectedUnit &&
      console.log('selectedUnit ->', {
        id: selectedUnit.id,
        size: selectedUnit.size,
        price: selectedUnit.price,
        code: selectedUnit.code,
      });
  }, [selectedUnit]);

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

        const unitOptions = data.map((unitInfo, index) => (
          <option key={index} value={unitInfo.size}>
            {unitInfo.size}
          </option>
        ));

        const defaultOption = (
          <option key='default' value=''>
            Size
          </option>
        );

        return (
          <div className='flex justify-between'>
            <select
              value={selectedUnit ? selectedUnit.size : ''}
              onChange={(e) => handleUnitChange(e, data)}
            >
              {defaultOption}
              {unitOptions}
            </select>

            <button onClick={handleAddToCart}>Add to Cart</button>
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
