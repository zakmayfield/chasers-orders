import { flexRender } from '@tanstack/react-table';
import { TableRow } from '@/types/products';

export const TableBody = ({ row }: { row: TableRow }) => {
  return (
    <tr className='even:bg-gray-100'>
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
