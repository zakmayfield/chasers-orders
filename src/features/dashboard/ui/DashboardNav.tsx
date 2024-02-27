'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { PiWarningDuotone } from 'react-icons/pi';
import { dashboardNavItems } from './dashboardNavData';
import DashNavItem from './DashNavItem';
import { getDashboardUser } from '@/services/queries/user.getDashboardUser';
import { DashboardUserData } from '@/types/types.dashboard';

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

      <DashboardNavFooter />
    </div>
  );
}

function DashboardNavHeader() {
  return (
    <div
      className={`
      h-12 w-full
      bg-light-secondary
    `}
    ></div>
  );
}

function DashboardNavFooter() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<DashboardUserData>({
    queryKey: ['user-dashboard'],
    queryFn: getDashboardUser,
    staleTime: 60 * 1000 * 10,
  });

  if (isLoading) {
    return (
      <div
        className={`
        h-20 py-3 px-6
        flex items-center gap-6
        bg-light-secondary
      `}
      >
        <div>
          <p
            className={`
              rounded-full w-10 h-10
              animate-pulse
              bg-light-accent/80
            `}
          ></p>
        </div>

        <div className='w-full flex flex-col gap-1'>
          <p
            className={`
              rounded h-6
              animate-pulse 
              bg-light-accent/80
            `}
          ></p>
          <p
            className={`
              rounded h-3 w-3/4
              animate-pulse 
              bg-light-accent/60
            `}
          ></p>
        </div>
      </div>
    );
  }

  if (isError && !user) {
    return (
      <div
        className={`
        h-20 py-3 px-6 
        flex items-center gap-3
        bg-light-secondary
      `}
      >
        <div className='text-2xl'>
          <PiWarningDuotone className='text-yellow-500' />
        </div>
        <p className='text-red-700 text-sm'>could not locate user</p>
      </div>
    );
  }

  return (
    <div
      className={`
        hidden 
        bg-light-secondary
        2xl:flex 2xl:items-center 2xl:gap-3 2xl:px-6 2xl:w-full 2xl:h-20
      `}
    >
      {/* "PFP" */}
      <div>
        <p
          className={`
              rounded-full w-10 h-10
              flex justify-center
              text-2xl
              bg-light-primary
            `}
        >
          {user.email.split('')[0]}
        </p>
      </div>

      {/* CONTACTS EMAIL & POSITION */}
      <div className='flex flex-col gap-1 '>
        {/* Overflow control container */}
        <div>
          <p
            className={`
              overflow-hidden text-ellipsis w-full
              text-sm
            `}
          >
            {user.email}
          </p>
        </div>
        {!user.contact.position ? (
          <p
            className={`
              rounded
              text-sm
            `}
          >
            {user.contact.position}
          </p>
        ) : (
          <Link
            href='/dashboard/settings/account/edit'
            className=' text-sm underline text-purple-800'
          >
            add position
          </Link>
        )}
      </div>
    </div>
  );
}
