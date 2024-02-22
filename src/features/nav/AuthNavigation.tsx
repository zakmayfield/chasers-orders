'use client';
import { getFavorites } from '@/services/queries/favorite.getFavorites';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AuthNavigation({
  isApproved,
}: {
  isApproved: boolean;
}) {
  const queryClient = useQueryClient();

  return (
    <div className='flex items-center gap-6'>
      <Link
        href='/products'
        onMouseEnter={() =>
          queryClient.prefetchQuery(['favorites'], {
            queryFn: getFavorites,
            staleTime: 60 * 1000 * 5,
          })
        }
      >
        Shop
      </Link>
      <Link href='/cart'>Cart</Link>
      <Link href='/dashboard'>Dashboard</Link>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
