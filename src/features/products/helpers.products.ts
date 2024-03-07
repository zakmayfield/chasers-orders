import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
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
import type { Favorite, Product, Unit } from '@prisma/client';
import type { ProductWithUnits } from '@/features/products/types';
import type { UnitsOnCartCacheType } from '@/features/cart/types';
import { toggleFavorite } from '@/services/mutations/favorite.toggleFavorite';
import { ActionTypes } from '@/features/products/types';
import { getFavorites } from '@/services/queries/favorite.getFavorites';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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

interface UseColumnSizeMutationProps {
  ({ cb }: { cb(value: string): Promise<void> }): {
    setColumnSizeCache: UseMutateFunction<void, unknown, string, unknown>;
  };
}

export const useColumnSizeMutation: UseColumnSizeMutationProps = ({ cb }) => {
  const { mutate: setColumnSizeCache } = useMutation({
    mutationFn: cb,
  });

  return { setColumnSizeCache };
};

interface UseSizeCacheQueryProps {
  ({ productId }: { productId: string }): {
    getSizeCache(): {
      sizeCache: string | undefined;
    };
  };
}

export const useSizeCacheQuery: UseSizeCacheQueryProps = ({ productId }) => {
  const queryClient = useQueryClient();

  function getSizeCache() {
    const sizeCache: string | undefined = queryClient.getQueryData([
      'size',
      productId,
    ]);

    return {
      sizeCache,
    };
  }

  return {
    getSizeCache,
  };
};

export const checkFavorite = (
  favorites: ExtendedFavorite[] | undefined,
  productId: string
) => {
  const favorite = favorites!.find((juice) => juice.juiceId === productId);

  return { favorite };
};

interface UseToggleFavorite {
  ({ onSuccess, onError }: ToggleFavoriteProps): {
    mutate: MutateType;
  };
}

type ToggleFavoriteProps = {
  onSuccess?: (data: ExtendedFavorite) => void;
  onError?: (error: unknown) => void;
};

type MutateType = UseMutateFunction<
  ExtendedFavorite,
  unknown,
  ActionTypes,
  unknown
>;

export const useToggleFavoriteMutation: UseToggleFavorite = ({
  onSuccess,
  onError,
}) => {
  const { mutate } = useMutation({
    mutationFn: ({ action, id }: ActionTypes) => toggleFavorite(action, id),
    onSuccess(data) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return { mutate };
};

interface UseFavoritesQuery {
  (options?: Options): UseFavoritesQueryReturn;
}

type Options = {
  extended: boolean;
};

type UseFavoritesQueryReturn = {
  favorites: ExtendedFavorite[] | undefined;
  isLoading: boolean;
};
export type FavoriteWithoutUserID = Omit<Favorite, 'userId'>;
export type ExtendedFavorite = FavoriteWithoutUserID & {
  juice: Product;
};

export const useFavoritesQuery: UseFavoritesQuery = () => {
  const { data: favorites, isLoading } = useQuery<ExtendedFavorite[], Error>({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: Infinity,
  });

  return { favorites, isLoading };
};

interface UseIsFavoriteProps {
  ({
    favorites,
    id,
  }: {
    favorites: ExtendedFavorite[] | undefined;
    id: string;
  }): {
    isProductFavorited: boolean;
    setIsProductFavorited: Dispatch<SetStateAction<boolean>>;
  };
}

export const useIsFavorite: UseIsFavoriteProps = ({ favorites, id }) => {
  const [isProductFavorited, setIsProductFavorited] = useState(false);

  useEffect(() => {
    const juice = favorites?.find((item) => item.juiceId === id) ? true : false;

    setIsProductFavorited(juice);
  }, [favorites, id]);

  return {
    isProductFavorited,
    setIsProductFavorited,
  };
};
