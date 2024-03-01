import { DashboardNav } from '@/features/dashboard/nav/DashboardNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-3/4 mx-auto grid grid-cols-12'>
      <h1 className='col-span-12 h-20 flex items-center px-6 border-b'>
        Dashboard
      </h1>

      {/* TODO: MAKE COL-SPAN-12 FOR BASE -- NEW BRANCH FOR THIS -- OUT OF SCOPE  */}
      <div className='m-6 col-span-12 2xl:col-span-9'>{children}</div>

      <DashboardNav />
    </div>
  );
}
