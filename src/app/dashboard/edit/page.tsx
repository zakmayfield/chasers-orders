import EditCompanyForm from '@/features/dashboard/ui/EditCompanyForm';
import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/db/db.prisma-client';

export default async function Page() {
  const session = await getAuthSession();
  const company = await db.company.findUnique({
    where: { userId: session?.user.id },
    select: {
      id: true,
      name: true,
    },
  });
  return (
    <div>
      <EditCompanyForm
        user={{ id: session?.user.id ?? '' }}
        // TODO: fix this
        company={company}
      />
    </div>
  );
}
