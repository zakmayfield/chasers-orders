import { SignInFormData, SignUpFormData } from '@/shared/validators/auth';
import { ProductWithUnits } from '@/types/products';
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
import { signIn } from 'next-auth/react';

//^ AUTH
export const handleSignIn = async (data: SignInFormData) =>
  await signIn('sign-in', {
    ...data,
  });

export const handleSignUp = async (data: SignUpFormData) => {
  try {
    await signIn('sign-up', {
      ...data,
    });

    return {
      isSuccess: true,
    };
  } catch (err) {
    return {
      isSuccess: false,
    };
  }
};

//^ PRODUCT TABLE CONFIG
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

  const reactTable = useReactTable({
    data: data ? data : [],
    columns,
    ...options,
  });

  return { reactTable };
};

export const getRowPayload = (info: CellContext<ProductWithUnits, Unit[]>) => {
  const units = info.getValue();
  const product = info.row.original;
  const defaultUnit = units[0];

  const rowPayload = {
    defaultUnit,
    units,
    product,
  };

  return { rowPayload };
};
