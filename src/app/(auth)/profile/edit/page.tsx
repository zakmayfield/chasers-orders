import EditCompanyForm from '@/features/auth/EditCompanyForm';
import { getAuthSession } from '@/lib/nextAuth/auth';
import { db } from '@/lib/db';

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
        company={company}
      />
    </div>
  );
}
