import { DashboardNav } from '@/app/dashboard/components/nav';
import { Title } from './components/title';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-3/4 mx-auto grid grid-cols-12'>
      <Title />

      <div className='m-6 col-span-11 2xl:col-span-9'>{children}</div>

      <DashboardNav />
    </div>
  );
}
