'use client';
import { FC } from 'react';
import Link from 'next/link';
import AuthNavigation from './AuthNavigation';

interface NavigationProps {
  isAuth: boolean;
}

export const Navigation: FC<NavigationProps> = ({ isAuth }) => {
  return (
    <div className='flex items-center gap-6'>
      {!isAuth ? <Link href='/'>Sign In</Link> : <AuthNavigation />}
    </div>
  );
};
