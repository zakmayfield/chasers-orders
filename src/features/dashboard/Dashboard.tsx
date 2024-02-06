'use client';

import { Company as CompanyType } from '@prisma/client';
import RecentOrders from './ui/RecentOrders';
import Company from '@/features/dashboard/ui/Company';

type DashboardProps = {
  companyData: CompanyType | null;
};

const Dashboard: React.FC<DashboardProps> = ({ companyData }) => {
  return (
    <div>
      <Company company={companyData} />
      <RecentOrders />
    </div>
  );
};

export default Dashboard;
