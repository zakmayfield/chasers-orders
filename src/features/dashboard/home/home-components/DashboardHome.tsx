import { FC } from 'react';
import { DashboardUserData } from '@/types/types.dashboard';
import { AccountStatus } from './AccountStatus';
import { ContactDetails } from './ContactDetails';
import { CompanyDetails } from './CompanyDetails';
import RecentOrderDetails from './RecentOrderDetails';

interface DashboardHomeProps {
  userData: DashboardUserData;
}

// TODO: Dashboard home `Recent Orders` section: `user-dashboard` cache is not updated when placing an order.

export const DashboardHome: FC<DashboardHomeProps> = ({ userData }) => {
  return (
    <div className='font-extralight flex flex-col gap-12'>
      <AccountStatus userData={userData} />
      <ContactDetails userData={userData} />
      <CompanyDetails userData={userData} />
      <RecentOrderDetails userData={userData} />
    </div>
  );
};
