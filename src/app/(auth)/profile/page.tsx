import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Page() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect('/sign-in');
  }

  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      isApproved: true,
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
