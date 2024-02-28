'use client';

import { usePathname } from 'next/navigation';
import { dashboardNavItems } from './dashboardNavData';
import DashboardNavFooter from './DashboardNavFooter';
import DashNavItem from './DashboardNavItem';
import DashboardNavHeader from './DashboardNavHeader';
import DashboardNavItems from './DashboardNavItems';

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <div
      className={`
        col-span-12 row-start-2
        flex items-center
        bg-light-primary 
        2xl:col-span-3 2xl:row-auto 2xl:flex-col 2xl:justify-between 2xl:h-[35rem] 2xl:rounded-b-2xl 2xl:overflow-hidden 
      `}
    >
      {/* <DashboardNavHeader /> */}
      <DashboardNavItems />
      <DashboardNavFooter />
    </div>
  );
}
