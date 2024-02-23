import DashboardNav from '@/features/dashboard/ui/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Dashboard path layout UI
  return (
    <div className='w-3/4 mx-auto grid grid-cols-12'>
      <h2 className='col-span-12 h-20 flex font-extralight text-2xl px-6 items-center border-b'>
        Dashboard
      </h2>

      <div className='col-span-9 p-6'>{children}</div>

      <div className='col-span-3 p-6 border-l'>
        <DashboardNav />
      </div>
    </div>
  );
}
