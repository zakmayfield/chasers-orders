'use client';

import { useDashboardQuery } from '@/hooks/useDashboardQuery';
import { DashboardUser } from '@/types/types.dashboard';

export default function Account() {
  const { fetchState, isError, isData } = useDashboardQuery<DashboardUser>();

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
      {OnError}
      {AccountInfo}
    </div>
  );
}
