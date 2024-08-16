'use client';

import { useDashboardData } from '@/shared/hooks/data';
import { SecureUser } from '@/types/user';

export default function Account() {
  const { fetchState, isLoading, isError, isData } =
    useDashboardData<SecureUser>();

  const OnLoad = isLoading && (
    <div>
      <p>Loading account data...</p>
    </div>
  );

  const OnError = fetchState && isError(fetchState) && (
    <div className='foobar'>
      <p>{fetchState.error}</p>
    </div>
  );

  const AccountInfo = fetchState && isData(fetchState) && (
    <div className='py-3'>
      <p>
        <span>Email: </span>
        <span>{fetchState.email}</span>
      </p>

      <div className='flex items-center gap-3'>
        <p>
          <span>Account approved: </span>
          <span>{fetchState.isApproved ? '✅' : '🔴'}</span>
        </p>
        <p>
          <span>Email verification: </span>
          <span>{fetchState.emailVerified ? '✅' : '🔴'}</span>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <p>Account Data</p>
      {OnLoad}
      {OnError}
      {AccountInfo}
    </div>
  );
}
