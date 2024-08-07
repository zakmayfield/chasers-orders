import { QueryFunction, QueryKey } from '@tanstack/react-query';

export enum QueryKeys {
  USER_STATUS = 'user-status',
}

export type UseCustomQueryParams<T> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
};
