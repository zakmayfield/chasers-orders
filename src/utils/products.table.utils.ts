import { ProductWithUnits } from '@/features/products/types';
import { Unit } from '@prisma/client';
import { CellContext } from '@tanstack/react-table';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

export const useTableConfig = (
  data: ProductWithUnits[] | undefined,
  columns: ColumnDef<ProductWithUnits, any>[]
) => {
  const options = {
    enableFilters: true,
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  };

  const reactTable = useReactTable({
    data: data ? data : [],
    columns,
    ...options,
  });

  return { reactTable };
};

type GetRowPayload = {
  (info: CellContext<ProductWithUnits, Unit[]>): {
    rowPayload: RowPayload;
  };
};

export type RowPayload = {
  defaultUnit: Unit;
  units: Unit[];
  product: ProductWithUnits;
};

export const getRowPayload: GetRowPayload = (info) => {
  const units = info.getValue();
  const product = info.row.original;
  const defaultUnit = units[0];

  const rowPayload: RowPayload = {
    defaultUnit,
    units,
    product,
  };

  return { rowPayload };
};
