import { DashboardNav } from '@/app/dashboard/components/nav';
import { Heading } from '@/shared/components/ui';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-3/4 mx-auto grid grid-cols-12'>
      {/* <Heading
        as='h1'
        content='Dashboard'
        className='col-span-12 border-b px-6 pb-6'
      /> */}

      <div className='m-6 col-span-11 2xl:col-span-9'>{children}</div>

      {/* <DashboardNav /> */}
    </div>
  );
}
