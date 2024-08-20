'use client';
import { flexRender } from '@tanstack/react-table';
import { Filter } from './filter';
import { useTableContext } from '@/lib/providers/TableProvider';
import { TableHeadersGroup } from '@/types/products';

export const TableHeaders = ({ group }: { group: TableHeadersGroup }) => {
  const { tableConfig } = useTableContext();

  return (
    <tr>
      {group.headers.map((header) => (
        <th key={header.id} className='text-left align-top pb-6'>
          {header.isPlaceholder ? null : (
            <div>
              {/* Column Header Title */}
              {flexRender(header.column.columnDef.header, header.getContext())}

              {/* Filter */}
              {header.column.getCanFilter() ? (
                <div className='mt-3 text-base'>
                  <Filter tableConfig={tableConfig} column={header.column} />
                </div>
              ) : null}
            </div>
          )}
        </th>
      ))}
    </tr>
  );
};
