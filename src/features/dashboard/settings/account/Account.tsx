'use client';

import { getDashboardUserData } from '@/store/user/user.getDashboardUserData';
import {
  DashboardQueryError,
  DashboardUser,
  DashboardUserData,
} from '@/types/types.dashboard';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type AccountQueryResult = DashboardUser | DashboardQueryError | null;

export default function Account() {
  const queryClient = useQueryClient();
  const [fetchState, setFetchState] = useState<AccountQueryResult>(null);

  useEffect(() => {
    (async () => {
      try {
        const data: DashboardUserData | undefined =
          await queryClient.fetchQuery(
            ['user-dashboard'],
            getDashboardUserData,
            { staleTime: 60 * 1000 * 5 }
          );

        if (!data) {
          setFetchState({ error: 'Could not access account data.' });
          return;
        }

        const { id, email, emailVerified, isApproved } = data;

        setFetchState({
          id,
          email,
          emailVerified,
          isApproved,
        });
      } catch (error) {
        if (error instanceof Error) {
          setFetchState({ error: error.message });
          console.error(error);
        }
      }
    })();
  }, [queryClient]);

  function isError(data: unknown): data is DashboardQueryError {
    return !!data && typeof data === 'object' && 'error' in data;
  }
  function isUserData(data: unknown): data is DashboardUser {
    return !!data && typeof data === 'object' && 'id' in data;
  }

  const OnError = fetchState && isError(fetchState) && (
    <div className='foobar'>
      <p>{fetchState.error}</p>
    </div>
  );

  const AccountInfo = fetchState && isUserData(fetchState) && (
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
