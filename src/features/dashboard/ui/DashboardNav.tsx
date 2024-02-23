'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardNavItem, dashboardNavItems } from './dashboardNavData';
import DashNavItem from './DashNavItem';

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <div className='flex flex-col gap-3'>
      {dashboardNavItems.map((item) => (
        <DashNavItem item={item} pathname={pathname} />
      ))}
    </div>
  );
}
