'use client';
import { FC } from 'react';
import Link from 'next/link';
import AuthNavigation from './AuthNavigation';

interface NavigationProps {
  isAuth: boolean;
}

const Navigation: FC<NavigationProps> = ({ isAuth }) => {
  return (
    <div className='flex items-center gap-6'>
      <Link href='/'>Home</Link>
      {!isAuth ? <Link href='/sign-in'>Sign In</Link> : <AuthNavigation />}
    </div>
  );
};

export default Navigation;
