'use client';

import { DashboardNavItems } from './nav-components';
import { DashboardNavHeader } from './nav-components/DashboardNavHeader';

export const DashboardNav = () => {
  // TODO: Implement footer loading state
  return (
    <div
      className={`
        col-start-12 col-span-1 row-start-2 rounded-2xl overflow-hidden bg-light-primary mt-6
        flex flex-col justify-between h-[35rem] min-w-[5rem]
        sticky top-6
        2xl:border-b-0 2xl:col-span-3 2xl:row-auto
      `}
    >
      <div>
        <DashboardNavHeader />
        <DashboardNavItems />
      </div>
      // Todo add footer back
    </div>
  );
};
