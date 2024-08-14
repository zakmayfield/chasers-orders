'use client';
import { useGetProducts } from '@/shared/hooks/queries';
import { useTableConfig } from './config';
import { ReactTable } from './components';
import { Pagination } from './components/pagination';
import { TableProvider } from '@/lib/providers/TableProvider';

export const Table = () => {
  const { data } = useGetProducts();
  const { tableConfig } = useTableConfig(data);

  return (
    <div>
      <TableProvider tableConfig={tableConfig}>
        <ReactTable />
        <Pagination />
      </TableProvider>
    </div>
  );
};
