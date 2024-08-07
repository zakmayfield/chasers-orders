import React from 'react';
import { Table as ReactTable, flexRender } from '@tanstack/react-table';
import { ProductWithUnits } from '@/types/products';
import { Filter } from './Filter';

export const Table = ({
  reactTable,
}: {
  reactTable: ReactTable<ProductWithUnits>;
}) => {
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
};
