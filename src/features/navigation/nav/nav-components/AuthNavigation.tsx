'use client';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { getFavorites } from '@/services/queries/favorite.getFavorites';
import { navData } from '../navData';
import { AuthNavItem } from './AuthNavItem';
import { usePathname } from 'next/navigation';

export default function AuthNavigation({
  isApproved,
}: {
  isApproved: boolean;
}) {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  return (
    <div className='flex items-center gap-6'>
      {navData.map((item) => (
        <AuthNavItem key={item.path} navItem={item} pathname={pathname} />
      ))}

      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
