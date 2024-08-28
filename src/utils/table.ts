import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TProductWithVariants } from '@/shared/types/Product';

export const getColumnHelper = () => createColumnHelper<TProductWithVariants>();

export const useTableConstructor = (
  data: TProductWithVariants[] | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TProductWithVariants, any>[]
) => {
  const options = {
    enableFilters: true,
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  };

  const tableConfig = useReactTable({
    data: data ? data : [],
    columns,
    ...options,
  });

  return { tableConfig };
};
