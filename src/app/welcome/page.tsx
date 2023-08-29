import { getAuthSession } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Welcome() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect('/sign-in');
  }
  return (
    <div>
      <h1>Welcome</h1>
      {session.user.isApproved ? (
        <div>
          <h2>Your account is approved</h2>
          <p>
            Visit our <Link href='/products'>Shop</Link>
          </p>
        </div>
      ) : (
        <h2>Your account is pending approval</h2>
      )}
    </div>
  );
}
