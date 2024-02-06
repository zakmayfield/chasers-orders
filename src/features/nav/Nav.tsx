import Link from 'next/link';
import UserNav from './ui/UserNav';
import { getAuthSession } from '@/lib/auth/auth.options';

export default async function Nav() {
  const session = await getAuthSession();

  // console.log(session);

  return (
    <nav className='flex items-center gap-6'>
      <Link href='/'>Home</Link>

      {session?.user ? <UserNav /> : <Link href='/sign-in'>Sign In</Link>}
    </nav>
  );
}
