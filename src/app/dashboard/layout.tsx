import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='border w-3/4 mx-auto grid grid-cols-4'>
      <div className='col-span-3 m-6 border'>{children}</div>

      <div className='col-span-1 py-6 border'>
        <div className='flex flex-col gap-3 w-2/3 mx-auto'>
          <Link href='/dashboard' className='border rounded-lg p-2'>
            Dashboard Home
          </Link>
          <Link href='/dashboard' className='border rounded-lg p-2'>
            Favorite Juices
          </Link>
          <Link
            href='/dashboard/recent-orders'
            className='border rounded-lg p-2'
          >
            Recent Orders
          </Link>
          <Link href='/dashboard/settings' className='border rounded-lg p-2'>
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
