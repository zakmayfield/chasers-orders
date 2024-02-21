'use server';

import { FC } from 'react';
import { getAuthSession } from '@/lib/auth/auth.options';
import type { Session } from 'next-auth';
import Navigation from './Navigation';

interface NavProps {}

const Nav: FC<NavProps> = async ({}) => {
  const session = await getAuthSession();

  const checkAuth = (data: unknown): data is Session => {
    return !!data && typeof data === 'object' && 'user' in data;
  };

  const isAuth = checkAuth(session);
  const isApproved = !!session?.user.isApproved;

  return (
    <nav className='flex items-center gap-6'>
      <Navigation isAuth={isAuth} isApproved={isApproved} />
    </nav>
  );
};

export default Nav;
