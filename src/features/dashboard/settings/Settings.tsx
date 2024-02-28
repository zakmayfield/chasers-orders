'use client';

import Link from 'next/link';
import { useDashboardQuery } from '@/hooks/query.hooks';
import { DashboardUserData } from '@/types/types.dashboard';

export default function Settings() {
  const { fetchState, isLoading, isData, isError } =
    useDashboardQuery<DashboardUserData>();

  const LoadingData = isLoading && <div>Loading...</div>;

  const ErrorData = fetchState && isError(fetchState) && (
    <div>{fetchState.error}</div>
  );

  const SettingsData = fetchState && isData(fetchState) && (
    <div className='flex flex-col gap-6'>
      <div>
        <h2>Account</h2>
        <p>{`{account}`}</p>
      </div>

      <div>
        <h2>Contact</h2>
        <p>{`{contact}`}</p>
        <Link href='/dashboard/settings/contact/edit'>Edit</Link>
      </div>

      <div>
        <h2>Company</h2>
        <p>{`{company}`}</p>
        <Link href='/dashboard/settings/company/edit'>Edit</Link>
      </div>
    </div>
  );

  return (
    <div>
      {LoadingData}
      {ErrorData}
      {SettingsData}
    </div>
  );
}
