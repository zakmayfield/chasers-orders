'use client';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { NavigationItem } from './NavigationItem';

interface NavigationProps {
  isAuth: boolean;
}

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

export const Navigation: FC<NavigationProps> = ({ isAuth }) => {
  const pathname = usePathname();

  return (
    <nav className='flex items-center gap-6'>
      {navData.map((item) => (
        <NavigationItem key={item.path} navItem={item} pathname={pathname} />
      ))}

      <button onClick={() => signOut()} className='rounded px-1 hover:ring-2'>
        Logout
      </button>
    </nav>
  );
};
