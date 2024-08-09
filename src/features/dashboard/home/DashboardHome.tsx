'use client';

import { AccountStatus } from './components/account';
import { ContactDetails } from './components/contact';
import { CompanyDetails } from './components/company';
import { RecentOrderDetails } from './components/recent';
import { useGetUser } from '@/shared/hooks/queries';

const DashboardHome = () => {
  const { data, isLoading, error, isError } = useGetUser();

  const LoadingData = isLoading && <div>Loading dashboard...</div>;
  const ErrorData = isError && <div>{error && error.message}</div>;
  const DashboardHomeData = data && (
    <div className='font-extralight flex flex-col gap-12'>
      <AccountStatus userData={data} />
      <ContactDetails userData={data} />
      <CompanyDetails userData={data} />
      <RecentOrderDetails userData={data} />
    </div>
  );

  return (
    <div>
      {LoadingData}
      {ErrorData}
      {DashboardHomeData}
    </div>
  );
};

export default DashboardHome;
