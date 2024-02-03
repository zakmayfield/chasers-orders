import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/db/db.prisma-client';
import Profile from '@/features/profile/Profile';

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
      <Profile companyData={company} />
    </div>
  );
}
