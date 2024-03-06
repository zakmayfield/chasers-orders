import { ImSpinner2 } from 'react-icons/im';
import { ProductWithUnits } from '../../types';
import { Table as ReactTable } from '@tanstack/react-table';

export const Pagination = ({
  reactTable,
  isFetching,
}: {
  reactTable: ReactTable<ProductWithUnits>;
  isFetching?: boolean;
}) => {
  return (
    <div className='flex justify-between gap-6 mt-6'>
      {/* Next/Previous Pagination */}
      <div className='flex items-center gap-6'>
        <div className='flex gap-2'>
          <button
            className={`border rounded p-1 ${
              !reactTable.getCanPreviousPage()
                ? 'opacity-50'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => reactTable.setPageIndex(0)}
            disabled={!reactTable.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className={`border rounded p-1 ${
              !reactTable.getCanPreviousPage()
                ? 'opacity-50'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => reactTable.previousPage()}
            disabled={!reactTable.getCanPreviousPage()}
          >
            {'<'}
          </button>

          <button
            className={`border rounded p-1 ${
              !reactTable.getCanNextPage()
                ? 'opacity-50'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => reactTable.nextPage()}
            disabled={!reactTable.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className={`border rounded p-1 ${
              !reactTable.getCanNextPage()
                ? 'opacity-50'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() =>
              reactTable.setPageIndex(reactTable.getPageCount() - 1)
            }
            disabled={!reactTable.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          {isFetching ? (
            <strong className='flex items-center gap-2'>
              1 of
              <ImSpinner2 className='animate-spin' />
            </strong>
          ) : (
            <strong>
              {reactTable.getState().pagination.pageIndex + 1} of{' '}
              {reactTable.getPageCount()}
            </strong>
          )}
        </span>
      </div>
    </div>
  );
};
