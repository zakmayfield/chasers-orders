import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { navData } from '../navData';
import DashNavItem from './DashboardNavItem';

interface DashboardNavItemsProps {}

export const DashboardNavItems: FC<DashboardNavItemsProps> = ({}) => {
  const pathname = usePathname();

  return (
    <div
      className={`
        flex items-center  gap-3 w-full p-6 
        2xl:justify-center 2xl:flex-col 2xl:items-start 2xl:pt-12
      `}
    >
      {navData.map((item) => (
        <DashNavItem key={item.path} item={item} pathname={pathname} />
      ))}
    </div>
  );
};
