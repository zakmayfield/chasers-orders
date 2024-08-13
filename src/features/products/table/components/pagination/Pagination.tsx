import { PaginationButtonGroup } from './PagninationButtons';
import { PageIndex } from './PaginationIndex';
import { TableConfigParams } from '@/types/products';

export const Pagination = ({ tableConfig }: TableConfigParams) => {
  return (
    <div>
      <div className='flex items-center gap-6'>
        <PaginationButtonGroup tableConfig={tableConfig} />
        <PageIndex tableConfig={tableConfig} />
      </div>
    </div>
  );
};
