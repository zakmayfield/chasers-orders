'use client';

import Link from 'next/link';
import { FaClockRotateLeft, FaRegHeart } from 'react-icons/fa6';
import { RxDashboard } from 'react-icons/rx';
import { IoSettingsOutline } from 'react-icons/io5';
import { usePathname, useSearchParams } from 'next/navigation';

type DashboardNavItem = {
  path: string;
  icon?: JSX.Element;
  content: string;
};

const dashboardNavItems: DashboardNavItem[] = [
  {
    path: '',
    content: 'Dashboard Home',
    icon: <RxDashboard />,
  },
  {
    path: '/favorites',
    content: 'Favorite Juice',
    icon: <FaRegHeart />,
  },
  {
    path: '/recent-orders',
    content: 'Recent Orders',
    icon: <FaClockRotateLeft />,
  },
  {
    path: '/settings',
    content: 'Settings',
    icon: <IoSettingsOutline />,
  },
];

export default function DashboardNav() {
  const pathname = usePathname();
  console.log(pathname);

  const basePath = '/dashboard';
  return (
    <div className='flex flex-col gap-3 w-2/3 mx-auto'>
      {dashboardNavItems.map((item) => {
        const itemPath = item.path ? item.path : '';
        const route = basePath + itemPath;
        const isActive = route === pathname;

        console.log({ isActive, route, pathname });

        return (
          <Link
            key={item.content}
            href={route}
            className={`border rounded-lg p-2 flex items-center gap-3 ${
              isActive && 'bg-black bg-opacity-5 border-2'
            }`}
          >
            {item.icon}
            <span className={`${isActive && 'font-semibold'}`}>
              {item.content}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
