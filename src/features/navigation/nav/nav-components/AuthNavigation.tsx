'use client';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { navData } from '../navData';
import { AuthNavItem } from './AuthNavItem';

export default function AuthNavigation({
  isApproved,
}: {
  isApproved: boolean;
}) {
  const queryClient = useQueryClient();
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
