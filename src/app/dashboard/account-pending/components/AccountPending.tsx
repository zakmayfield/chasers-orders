'use client';
import { Heading, SpinLoader } from '@/shared/components/ui';
import { AccountPendingData } from './AccountPendingData';
import { useGetUserStatus } from '@/shared/hooks/data';

export const AccountPending = () => {
  const { isLoading } = useGetUserStatus();

  return (
    <div className='min-h-[35rem] flex flex-col gap-6'>
      {/* Account Pending Header */}
      <div className='flex items-center gap-3'>
        <Heading as='h2' content='Account Status' />
        {isLoading && <SpinLoader />}
      </div>

      {/* Account Pending Data */}
      <AccountPendingData />
    </div>
  );
};
