import DashboardNav from '@/features/dashboard/ui/DashboardNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-3/4 mx-auto grid grid-cols-12'>
      <h1 className='col-span-9 h-20 flex items-center px-6 border-b'>
        Dashboard
      </h1>

      <div className='m-6 col-span-9'>{children}</div>

      <DashboardNav />
    </div>
  );
}
