'use client';
import { useTableContext } from '@/lib/providers/TableProvider';

export const PageIndex = () => {
  const { tableConfig } = useTableContext();

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
