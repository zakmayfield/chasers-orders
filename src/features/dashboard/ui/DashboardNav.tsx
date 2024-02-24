'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardNavItem, dashboardNavItems } from './dashboardNavData';
import DashNavItem from './DashNavItem';

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <div className='col-span-3 border-l bg-slate-50 pt-6'>
      <div className='flex flex-col gap-3 p-6'>
        {dashboardNavItems.map((item) => (
          <DashNavItem item={item} pathname={pathname} />
        ))}
      </div>
    </div>
  );
}
