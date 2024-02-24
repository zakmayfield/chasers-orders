'use client';

import { usePathname } from 'next/navigation';
import { dashboardNavItems } from './dashboardNavData';
import DashNavItem from './DashNavItem';

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <div className='col-span-3 pt-6 bg-light-primary border-l'>
      <div className='flex flex-col gap-3 p-6'>
        {dashboardNavItems.map((item) => (
          <DashNavItem key={item.path} item={item} pathname={pathname} />
        ))}
      </div>
    </div>
  );
}
