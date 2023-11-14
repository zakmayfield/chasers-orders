import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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

  if (!user) return notFound();

  return (
    <div>
      <h1>Profile</h1>

      <div>
        <h2>Company Information</h2>
        {user.company && (
          <div>
            <p>{user.company.name}</p>
          </div>
        )}
      </div>
      <div>
        <Link href='/profile/edit'>Edit Company</Link>
      </div>
    </div>
  );
}
