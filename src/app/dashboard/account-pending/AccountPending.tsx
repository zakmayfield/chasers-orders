'use client';
import { Heading, LoadingSpinner } from '@/shared/components/ui';
import { AccountPendingData } from './components';
import { useGetUserStatus } from '@/shared/hooks/data';

export const AccountPending = () => {
  const { isLoading } = useGetUserStatus();

  return (
    <div className='min-h-[35rem] flex flex-col gap-6'>
      {/* Account Pending Header */}
      <div className='flex items-center gap-3'>
        <Heading as='h2' content='Account Status' />
        {isLoading && <LoadingSpinner />}
      </div>

      {/* Account Pending Data */}
      <AccountPendingData />
    </div>
  );
};
