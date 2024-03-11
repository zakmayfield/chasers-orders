import { useEffect, useState } from 'react';

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
import { toggleFavorite } from '@/features/products/services.products';
import { getFavorites } from '@/features/products/services.products';

import type { Favorite, Product, Unit } from '@prisma/client';
import type { ProductWithUnits, ActionTypes } from '@/features/products/types';
import type { CartCache, CartItem } from '@/features/cart/types';

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
    onSuccessCallback: (data: CartItem) => void;
    onErrorCallback: (error: unknown) => void;
  }): {
    addToCartMutation: UseMutateFunction<CartItem, unknown, string, unknown>;
  };
}

export const useAddToCartMutation: UseAddToCartMutationProps = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const queryClient = useQueryClient();

  const { mutate: addToCartMutation } = useMutation({
    mutationFn: addItem,
    onSuccess(data) {
      onSuccessCallback(data);
      setDataToCache(data);
    },
    onError(error) {
      onErrorCallback(error);
    },
  });

  function setDataToCache(data: CartItem) {
    queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) =>
      oldData
        ? {
            ...oldData,
            items: [data, ...oldData.items],
          }
        : oldData
    );
  }

  return { addToCartMutation };
};

interface UseSizeCache {
  ({ productId }: { productId: string }): {
    sizeQuery: () => {
      sizeCache: SizeCache;
    };
    sizeMutation: UseMutateFunction<void, unknown, string, unknown>;
  };
}

type SizeCache = string | undefined;

export const useSizeCache: UseSizeCache = ({ productId }) => {
  const queryClient = useQueryClient();

  function sizeQuery() {
    const sizeCache: string | undefined = queryClient.getQueryData([
      'size',
      productId,
    ]);

    return {
      sizeCache,
    };
  }

  const { mutate: sizeMutation } = useMutation({
    mutationFn: async (value: string) => {
      queryClient.setQueryData(['size', productId], value);
    },
  });

  return {
    sizeQuery,
    sizeMutation,
  };
};

interface GetActionToggle {
  ({
    favoriteId,
    productId,
    isProductFavorited,
  }: {
    favoriteId?: string;
    productId: string;
    isProductFavorited: boolean;
  }): {
    actionPayload: ActionTypes;
  };
}

export const getActionToggle: GetActionToggle = ({
  favoriteId,
  productId,
  isProductFavorited,
}) => {
  let actionPayload: ActionTypes;

  if (isProductFavorited && favoriteId) {
    // remove favorite by id
    actionPayload = { action: 'remove', id: favoriteId! };
  } else {
    // favorite product by id
    actionPayload = { action: 'add', id: productId };
  }

  return { actionPayload };
};

interface UseToggleFavorite {
  ({ onSuccess, onError }: ToggleFavoriteProps): {
    toggleFavoriteMutation: UseMutateFunction<
      ExtendedFavorite,
      unknown,
      ActionTypes,
      unknown
    >;
  };
}

type ToggleFavoriteProps = {
  onSuccess?: (data: ExtendedFavorite) => void;
  onError?: (error: unknown) => void;
};

export const useToggleFavoriteMutation: UseToggleFavorite = ({
  onSuccess,
  onError,
}) => {
  const { mutate: toggleFavoriteMutation } = useMutation({
    mutationFn: ({ action, id }: ActionTypes) => toggleFavorite(action, id),
    onSuccess(data) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return { toggleFavoriteMutation };
};

interface UseFavorites {
  ({ productId }: { productId?: string }): {
    query: {
      favorites: ExtendedFavorite[] | undefined;
      isLoading: boolean;
    };
    favorite: {
      isProductFavorited: boolean;
      favoriteId: string | undefined;
    };
  };
}

export type ExtendedFavorite = Omit<Favorite, 'userId'> & {
  juice: Product;
};

export const useFavorites: UseFavorites = ({ productId }) => {
  const [isProductFavorited, setIsProductFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | undefined>(undefined);

  const { data: favorites, isLoading } = useQuery<ExtendedFavorite[], Error>({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: Infinity,
  });

  useEffect(() => {
    const favorite =
      favorites && favorites.find((item) => item.juiceId === productId);

    if (favorite) {
      setFavoriteId(favorite.id);
      setIsProductFavorited(!!favorite);
    }
  }, [favorites, productId]);

  return {
    query: {
      favorites,
      isLoading,
    },
    favorite: {
      isProductFavorited,
      favoriteId: isProductFavorited ? favoriteId : undefined,
    },
  };
};
