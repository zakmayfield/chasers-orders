import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/db/db.prisma-client';
import Company from '@/features/profile/Company';
import RecentOrders from '@/features/profile/RecentOrders';

export default async function Page() {
  const session = await getAuthSession();
  const id = session?.user.id;

  const company = await db.company.findUnique({
    where: {
      userId: id,
    },
  });

  return (
    <div>
      <h1>Profile</h1>

      <Company company={company} />
      <RecentOrders />
    </div>
  );
}
