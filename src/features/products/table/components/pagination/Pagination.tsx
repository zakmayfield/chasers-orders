'use client';
import { PaginationButtonGroup } from './PagninationButtons';
import { PageIndex } from './PaginationIndex';

export const Pagination = () => {
  return (
    <div className='mt-6'>
      <div className='flex items-center gap-6'>
        <PaginationButtonGroup />
        <PageIndex />
      </div>
    </div>
  );
};
