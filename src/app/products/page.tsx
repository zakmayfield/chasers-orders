import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import Products from '@/features/products/Products';

export default async function Page() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect('/sign-in');
  }

  if (!session?.user.isApproved) {
    redirect('/welcome');
  }

  return <Products />;
}
