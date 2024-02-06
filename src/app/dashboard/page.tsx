import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/db/db.prisma-client';
import Dashboard from '@/features/dashboard/Dashboard';

export default async function Page() {
  const session = await getAuthSession();
  const id = session?.user.id;

  return (
    <div>
      <Dashboard />
    </div>
  );
}
