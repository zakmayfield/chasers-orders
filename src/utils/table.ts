import { ProductWithUnits, UnitsColumnInfo } from '@/types/products';
import { Unit } from '@prisma/client';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

export const getColumnHelper = () => createColumnHelper<ProductWithUnits>();

export const useTableConfig = (
  data: ProductWithUnits[] | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<ProductWithUnits, any>[]
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

export const getRowData = (info: UnitsColumnInfo) => {
  const product = info.row.original;

  return {
    product,
  };
};
