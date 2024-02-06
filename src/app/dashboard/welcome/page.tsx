import { getAuthSession } from '@/lib/auth/auth.options';
import Link from 'next/link';

export default async function Welcome() {
  const session = await getAuthSession();
  const { id: userId, isApproved } = session?.user || {};

  return (
    <div>
      {isApproved ? (
        <div>
          <h2>Your account is approved</h2>
          <p>
            Visit our{' '}
            <Link href='/products' className='underline'>
              Shop
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <h2>Your account is pending approval</h2>
          <p>
            Visit your{' '}
            <Link href='/dashboard' className='underline'>
              Dashboard
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
