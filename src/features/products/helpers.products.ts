import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { getProducts } from '@/features/products/services.products';
import { addItem } from '@/features/cart/services.cart';
import type { Unit } from '@prisma/client';
import type { ProductWithUnits } from '@/features/products/types';
import type { UnitsOnCartCacheType } from '@/features/cart/types';

export const getColumnHelper = () => createColumnHelper<ProductWithUnits>();

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

export const categoryData: string[] = [
  'blends',
  'singles',
  'lemonades',
  'limonades',
  'ice pops',
  'tea',
  'mojito',
  'chili peppers',
  'ciders',
  'dried',
  'garnish',
  'nut milks',
  'organic',
  'purees',
  'smoothies',
  'syrups',
  'vegetables',
  'zest',
  'mocktail',
  'cleanses',
  'wholesale',
];

interface UseFetchProductsQueryProps {
  (): {
    data: ProductWithUnits[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
  };
}

export const useFetchProductsQuery: UseFetchProductsQueryProps = () => {
  const { data, isLoading, isFetching } = useQuery<ProductWithUnits[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: Infinity,
  });

  return { data, isLoading, isFetching };
};

interface UseAddToCartMutationProps {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback: (data: UnitsOnCartCacheType) => void;
    onErrorCallback: (error: unknown) => void;
  }): {
    addToCartMutation: UseMutateFunction<
      UnitsOnCartCacheType,
      unknown,
      string,
      unknown
    >;
  };
}

export const useAddToCartMutation: UseAddToCartMutationProps = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const { mutate: addToCartMutation } = useMutation({
    mutationFn: addItem,
    onSuccess(data) {
      onSuccessCallback(data);
    },
    onError(error) {
      onErrorCallback(error);
    },
  });

  return { addToCartMutation };
};
