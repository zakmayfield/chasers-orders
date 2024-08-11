'use server';

import { FC } from 'react';
import { getAuthSession } from '@/lib/auth/auth.options';
import { Navigation } from './components';
import type { Session } from 'next-auth';

interface NavProps {}

export const Navbar: FC<NavProps> = async ({}) => {
  const session = await getAuthSession();

  const checkAuth = (data: unknown): data is Session => {
    return !!data && typeof data === 'object' && 'user' in data;
  };

  const isAuth = checkAuth(session);

  return (
    <nav className='flex items-center gap-6'>
      <Navigation isAuth={isAuth} />
    </nav>
  );
};
