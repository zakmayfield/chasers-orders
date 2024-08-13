import { Table } from '@tanstack/react-table';
import { TableHeaders } from './TableHeaders';
import { ProductWithUnits } from '@/types/products';
import { TableBody } from './TableBody';

export const ReactTable = ({
  tableConfig,
}: {
  tableConfig: Table<ProductWithUnits>;
}) => {
  return (
    <table>
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
