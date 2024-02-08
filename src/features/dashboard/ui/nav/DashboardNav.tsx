'use client';

import Link from 'next/link';

type DashboardNavItem = {
  path?: string;
  content: string;
};

const dashboardNavItems: DashboardNavItem[] = [
  {
    content: 'Dashboard Home',
  },
  {
    content: 'Favorite Juice',
  },
  {
    path: '/recent-orders',
    content: 'Recent Orders',
  },
  {
    path: '/settings',
    content: 'Settings',
  },
];

export default function DashboardNav() {
  const basePath = '/dashboard';
  return (
    <div className='flex flex-col gap-3 w-2/3 mx-auto'>
      {dashboardNavItems.map((item) => {
        const itemPath = item.path ? item.path : '';
        const route = basePath + itemPath;

        return (
          <Link
            key={item.content}
            href={route}
            className='border rounded-lg p-2'
          >
            {item.content}
          </Link>
        );
      })}
    </div>
  );
}
