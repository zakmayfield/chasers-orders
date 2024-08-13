import { Table } from '@tanstack/react-table';
import { PaginationButtonGroup } from './PagninationButtons';
import { ProductWithUnits } from '@/types/products';
import { PageIndex } from './PaginationIndex';

export const Pagination = ({
  tableConfig,
}: {
  tableConfig: Table<ProductWithUnits>;
}) => {
  return (
    <div>
      <div className='flex items-center gap-6'>
        <PaginationButtonGroup tableConfig={tableConfig} />
        <PageIndex tableConfig={tableConfig} />
      </div>
    </div>
  );
};
