'use client';
import { useGetProducts } from '@/shared/hooks/queries';
import { getTableConfig } from './config';
import { ReactTable } from './components';
import { Pagination } from './components/pagination';

export const Table = () => {
  const { data } = useGetProducts();
  const { tableConfig } = getTableConfig(data);

  return (
    <div>
      <ReactTable tableConfig={tableConfig} />
      <Pagination tableConfig={tableConfig} />
    </div>
  );
};
