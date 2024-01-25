import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { createCart } from '@/utils/dbHelpers';
import Link from 'next/link';

export default async function Welcome() {
  const session = await getAuthSession();
  const { id: userId, isApproved } = session?.user || {};

  const hasCart = await db.cart.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!hasCart) {
    await createCart(userId!);
  }

  return (
    <div>
      <h1>Welcome</h1>
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
            <Link href='/profile' className='underline'>
              Profile
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
