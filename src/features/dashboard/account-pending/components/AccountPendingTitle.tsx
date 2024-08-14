'use client';
import { LoadingSpinner } from '@/shared/components';
import { useGetUserStatus } from '@/shared/hooks/queries';

export const AccountPendingTitle = () => {
  const { isLoading } = useGetUserStatus();

  return (
    <h2 className='flex items-center gap-3'>
      Account Status <span>{isLoading && <LoadingSpinner />}</span>
    </h2>
  );
};
