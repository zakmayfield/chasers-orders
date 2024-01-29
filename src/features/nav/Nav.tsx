import Link from 'next/link';
import UserNav from './UserNav';
import { getAuthSession } from '@/lib/auth';

export default async function Nav() {
  const session = await getAuthSession();

  return (
    <nav className='flex items-center gap-6'>
      <Link href='/'>Home</Link>
      <Link href='/products'>Shop</Link>

      {session?.user ? <UserNav /> : <Link href='/sign-in'>Sign In</Link>}
    </nav>
  );
}
