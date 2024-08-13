import { TableHeaders } from './TableHeaders';
import { TableBody } from './TableBody';
import { TableConfigParams } from '@/types/products';

export const ReactTable = ({ tableConfig }: TableConfigParams) => {
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
