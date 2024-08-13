import { Row, flexRender } from '@tanstack/react-table';
import { ProductWithUnits } from '@/types/products';

export const TableBody = ({ row }: { row: Row<ProductWithUnits> }) => {
  return (
    <tr>
      {row.getVisibleCells().map((cell) => {
        return (
          <td key={cell.id} className='py-2'>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};
