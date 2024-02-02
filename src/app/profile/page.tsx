import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db.prisma-client';
import { notFound } from 'next/navigation';
import Profile from '@/features/profile/Profile';
import RecentOrders from '@/features/profile/RecentOrders';

export default async function Page() {
  const session = await getAuthSession();
  const id = session?.user.id;

  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
      orders: {
        take: 3,
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          lineItems: true,
        },
      },
    },
  });

  if (!user) return notFound();

  return (
    <div>
      <Profile company={user.company!} />
      <RecentOrders orders={user.orders} />
    </div>
  );
}
