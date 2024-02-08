import DashboardNav from '@/features/dashboard/ui/nav/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='border w-3/4 mx-auto grid grid-cols-4'>
      <div className='col-span-3 m-6 border'>{children}</div>

      <div className='col-span-1 py-6 border'>
        <DashboardNav />
      </div>
    </div>
  );
}
