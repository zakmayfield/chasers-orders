import { QueryFunction, QueryKey } from '@tanstack/react-query';

export enum QueryKeys {
  USER_STATUS = 'user-status',
  CART = 'cart',
  SHIPPING = 'shipping',
}

export type UseCustomQueryParams<T> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
  staleTime?: number;
};
