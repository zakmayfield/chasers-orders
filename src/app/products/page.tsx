import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Products() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect('/sign-in');
  }

  if (!session?.user.isApproved) {
    redirect('/welcome');
  }

  return (
    <div>
      <h1>Products</h1>
      <p>product1</p>
      <p>product2</p>
      <p>product3</p>
    </div>
  );
}
