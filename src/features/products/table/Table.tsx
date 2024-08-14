'use client';
import { useGetProducts } from '@/shared/hooks/queries';
import { useTableConfig } from './config';
import { ReactTable } from './components';
import { TableLoading } from './components/TableLoading';
import { Pagination } from './components/pagination';
import { TableProvider } from '@/lib/providers/TableProvider';

export const Table = () => {
  const { data: products, isLoading } = useGetProducts();
  const { tableConfig } = useTableConfig(products);

  return (
    <div className='mx-12'>
      <TableProvider tableConfig={tableConfig}>
        {isLoading ? (
          <TableLoading />
        ) : (
          <div>
            <ReactTable />
            <Pagination />
          </div>
        )}
      </TableProvider>
    </div>
  );
};
