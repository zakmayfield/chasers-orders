import { FC } from 'react';
import { dashboardNavItems } from './dashboardNavData';
import DashNavItem from './DashboardNavItem';
import { usePathname } from 'next/navigation';

interface DashboardNavItemsProps {}

const DashboardNavItems: FC<DashboardNavItemsProps> = ({}) => {
  const pathname = usePathname();

  return (
    <div
      className={`
        flex items-center  gap-3 w-full p-6 
        2xl:justify-center 2xl:flex-col 2xl:items-start 2xl:pt-12
      `}
    >
      {dashboardNavItems.map((item) => (
        <DashNavItem key={item.path} item={item} pathname={pathname} />
      ))}
    </div>
  );
};

export default DashboardNavItems;
