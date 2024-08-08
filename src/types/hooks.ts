import {
  MutationFunction,
  QueryFunction,
  QueryKey,
} from '@tanstack/react-query';

export enum QueryKeys {
  USER_STATUS = 'user-status',
  CART = 'cart',
  SHIPPING = 'shipping',
  SIZE = 'size',
  ORDER = 'order',
  ORDERS = 'orders',
  DASHBOARD = 'dashboard',
  PRODUCTS = 'products',
}

export type UseCustomQueryParams<T> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
  staleTime?: number;
};

export type UseCustomMutationParams<T, V> = {
  mutationFn: MutationFunction<T, V>;
  handleSuccess?(data: T): void;
  handleError?(error: Error, variables?: V): void;
};
