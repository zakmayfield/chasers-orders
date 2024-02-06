'use client';

import { Company as CompanyType } from '@prisma/client';
import RecentOrders from './ui/RecentOrders';
import Company from '@/features/dashboard/ui/Company';

const Dashboard = () => {
  return (
    <div>
      <Company />
      <RecentOrders />
    </div>
  );
};

export default Dashboard;
