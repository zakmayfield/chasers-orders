import { TableConfigParams } from '@/types/products';

export const PageIndex = ({ tableConfig }: TableConfigParams) => {
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
