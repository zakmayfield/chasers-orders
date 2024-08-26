'use client';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AuthNavItem } from './AuthNavItem';

export type NavItem = {
  path: string;
  content: string;
};

const navData: NavItem[] = [
  {
    path: '/products',
    content: 'Shop',
  },
  {
    path: '/cart',
    content: 'Cart',
  },
  {
    path: '/dashboard',
    content: 'Dashboard',
  },
];

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
