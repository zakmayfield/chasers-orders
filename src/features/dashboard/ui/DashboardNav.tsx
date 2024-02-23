'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardNavItem, dashboardNavItems } from './dashboardNavData';

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

function DashNavItem({
  item,
  pathname,
}: {
  item: DashboardNavItem;
  pathname: string;
}) {
  const basePath = '/dashboard';
  const itemPath = item.path;
  const route = basePath + itemPath;
  const isActive =
    pathname === route || (route !== basePath && pathname.startsWith(route));

  return (
    <div>
      <Link
        key={item.content}
        href={route}
        className={`border rounded-lg p-2 flex items-center gap-3 ${
          isActive && 'bg-slate-200 border-2'
        }`}
      >
        {item.icon}
        <span className={`${isActive && 'font-semibold'}`}>{item.content}</span>
      </Link>
    </div>
  );
}
