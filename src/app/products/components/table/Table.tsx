'use client';
import { useTableConfig } from './config';
import { ReactTable } from './components';
import { TableLoading } from './components/TableLoading';
import { Pagination } from './components/pagination';
import { TableProvider } from '@/lib/providers/TableProvider';
import { TProductWithVariants } from '@/shared/types/Product';
import { useGetProducts } from '@/shared/hooks/data/products/useProducts';

export const Table = () => {
  const { data, isLoading } = useGetProducts({ hasVariants: true });

  const { tableConfig } = useTableConfig(data.withVariants);

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
