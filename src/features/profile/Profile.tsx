'use client';

import { Company as CompanyType } from '@prisma/client';
import RecentOrders from './ui/RecentOrders';
import Company from '@/features/profile/ui/Company';

type ProfileProps = {
  companyData: CompanyType | null;
};

const Profile: React.FC<ProfileProps> = ({ companyData }) => {
  return (
    <div>
      <Company company={companyData} />
      <RecentOrders />
    </div>
  );
};

export default Profile;
