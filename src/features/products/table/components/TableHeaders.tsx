import { flexRender } from '@tanstack/react-table';
import { TableConfig, TableHeadersGroup } from '@/types/products';
import { Filter } from './filter';

export const TableHeaders = ({
  group,
  tableConfig,
}: {
  group: TableHeadersGroup;
  tableConfig: TableConfig;
}) => {
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
