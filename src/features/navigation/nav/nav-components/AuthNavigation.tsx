'use client';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { navData } from '@/utils/constants';
import { AuthNavItem } from './AuthNavItem';

export default function AuthNavigation() {
  const pathname = usePathname();

  return (
    <div className='flex items-center gap-3'>
      {navData.map((item) => (
        <AuthNavItem key={item.path} navItem={item} pathname={pathname} />
      ))}

      <button onClick={() => signOut()} className='rounded px-1 hover:ring-2'>
        Logout
      </button>
    </div>
  );
}
