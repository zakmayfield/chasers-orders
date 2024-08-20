'use client';
import { AccountPendingTitle, AccountPendingData } from './components';

export const AccountPending = () => {
  return (
    <div className='min-h-[35rem] flex flex-col gap-6'>
      <AccountPendingTitle />
      <AccountPendingData />
    </div>
  );
};
