'use client';
import { useTableConfig } from './config';
import { ReactTable } from './components';
import { TableLoading } from './components/TableLoading';
import { Pagination } from './components/pagination';
import { TableProvider } from '@/lib/providers/TableProvider';
import { useGetAllProducts } from '@/shared/hooks/data/products/useProducts';
import { TProductWithVariants } from '@/shared/types/Product';

export const Table = () => {
  const { data, isLoading } = useGetAllProducts({ hasVariants: true });
  const { tableConfig } = useTableConfig(
    data as TProductWithVariants[] | undefined
  );

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
