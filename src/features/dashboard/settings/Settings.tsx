'use client';

import { useDashboardQuery } from '@/hooks/useDashboardQuery';
import { DashboardUserData } from '@/types/types.dashboard';
import Link from 'next/link';

export default function Settings() {
  const { fetchState, isLoading, isData, isError } =
    useDashboardQuery<DashboardUserData>();

  const OnLoad = isLoading && (
    <div>
      <div>Loading...</div>
    </div>
  );

  const OnError = fetchState && isError(fetchState) && (
    <div>
      <p>{fetchState.error}</p>
    </div>
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
      <div className='mb-3'>Settings</div>

      {OnLoad}
      {OnError}
      {SettingsData}
    </div>
  );
}
