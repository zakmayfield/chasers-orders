import {
  MutationFunction,
  QueryFunction,
  QueryKey,
} from '@tanstack/react-query';
import { DefaultValues, FieldValues, Resolver } from 'react-hook-form';

export enum QueryKeys {
  USER_STATUS = 'user-status',
  CART = 'cart',
  SHIPPING = 'shipping',
  SIZE = 'size',
  ORDER = 'order',
  ORDERS = 'orders',
  DASHBOARD = 'dashboard',
  PRODUCTS = 'products',
  FAVORITES = 'favorites',
}

export type UseCustomQueryParams<T> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
  staleTime?: number;
};

export type UseCustomMutationParams<T, V> = {
  mutationFn: MutationFunction<T, V>;
  handleSuccess?(data: T, variables?: V): void;
  handleError?(error: Error, variables?: V): void;
};

export type UseCustomFormParams<T extends FieldValues> = {
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
};
