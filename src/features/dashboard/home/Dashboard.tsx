'use client';

import { useQuery } from '@tanstack/react-query';
import { getDashboardUser } from '@/services/queries/user.getDashboardUser';
import { DashboardUserData } from '@/types/types.dashboard';
import { DashboardHome } from './home-components';

const Dashboard = () => {
  const { data, isLoading, error, isError } = useQuery<
    DashboardUserData,
    Error
  >({
    queryKey: ['user-dashboard'],
    queryFn: getDashboardUser,
    staleTime: 60 * 1000 * 10,
  });

  const LoadingData = <div>Loading dashboard...</div>;
  const ErrorData = <div>{error && error.message}</div>;
  const DashboardHomeData = data && <DashboardHome userData={data} />;

  return (
    <div>
      {isLoading && LoadingData}
      {isError && ErrorData}
      {DashboardHomeData}
    </div>
  );
};

export default Dashboard;
