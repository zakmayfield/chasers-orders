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
        flex flex-col items-center gap-6 w-full p-6
        2xl:justify-center 2xl:flex-col 2xl:items-start 2xl:gap-3
      `}
    >
      {navData.map((item) => (
        <DashNavItem key={item.path} item={item} pathname={pathname} />
      ))}
    </div>
  );
};
