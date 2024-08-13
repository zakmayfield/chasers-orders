import { ProductWithUnits } from '@/types/products';
import { Table } from '@tanstack/react-table';

export const PageIndex = ({
  tableConfig,
}: {
  tableConfig: Table<ProductWithUnits>;
}) => {
  return (
    <span className='flex items-center gap-1'>
      <p>Page</p>
      <strong>
        {tableConfig.getState().pagination.pageIndex + 1} of{' '}
        {tableConfig.getPageCount()}
      </strong>
    </span>
  );
};
