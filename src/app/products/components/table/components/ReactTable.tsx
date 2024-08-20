'use client';
import { TableHeaders } from './TableHeaders';
import { TableBody } from './TableBody';
import { useTableContext } from '@/lib/providers/TableProvider';

export const ReactTable = () => {
  const { tableConfig } = useTableContext();

  return (
    <table className='w-full'>
      <thead>
        {tableConfig.getHeaderGroups().map((group) => (
          <TableHeaders key={group.id} group={group} />
        ))}
      </thead>

      <tbody>
        {tableConfig.getRowModel().rows.length > 0 &&
          tableConfig
            .getRowModel()
            .rows.map((row) => <TableBody key={row.id} row={row} />)}
      </tbody>
    </table>
  );
};
