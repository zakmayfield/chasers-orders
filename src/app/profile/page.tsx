import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db.prisma-client';
import { notFound } from 'next/navigation';
import Profile from '@/features/profile/Profile';
import RecentOrders from '@/features/profile/RecentOrders';
import { getOrders } from '@/store/order.get';

export default async function Page() {
  const session = await getAuthSession();
  const id = session?.user.id;

  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
    },
  });

  // need to pass `headers()` to the fetch when fetching data server side
  const orders = await getOrders(id!);

  if (!user) return notFound();

  return (
    <div>
      <Profile company={user.company!} />
      <RecentOrders orders={orders} />
    </div>
  );
}
