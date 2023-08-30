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

  console.log('-----user-----', user);

  return (
    <div>
      <h1>Profile</h1>

      <div>
        <h2>Company Information</h2>
        {user.company ? (
          <div>
            <p>Name</p>
            <p>Address</p>
          </div>
        ) : (
          <div>
            <p>
              Please add some information to better assist with verification
            </p>
            <Link href='/profile/edit'>Edit Profile</Link>
          </div>
        )}
      </div>
    </div>
  );
}
