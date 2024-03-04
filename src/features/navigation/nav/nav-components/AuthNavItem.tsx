'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { NavItem } from '../navData';
import { getFavorites } from '@/services/queries/favorite.getFavorites';

interface AuthNavItemProps {
  navItem: NavItem;
  pathname: string;
}

export const AuthNavItem: FC<AuthNavItemProps> = ({ navItem, pathname }) => {
  const queryClient = useQueryClient();

  const basePath = '';
  const itemPath = navItem.path;
  const route = basePath + itemPath;

  const [active, setActive] = useState(false);

  useEffect(() => {
    const isActive =
      pathname === route || (route !== basePath && pathname.startsWith(route));

    setActive(isActive);
  }, [pathname]);

  function handlePrefetch(path: string) {
    const pathname = path.split('/')[1];

    switch (pathname) {
      case 'products':
        queryClient.prefetchQuery(['favorites'], {
          queryFn: getFavorites,
          staleTime: 60 * 1000 * 5,
        });
        break;

      default:
        break;
    }
  }

  return (
    <Link
      href={itemPath}
      onMouseEnter={() => handlePrefetch(itemPath)}
      className={`rounded px-1 ${active ? 'underline' : 'hover:ring-2'}`}
    >
      {navItem.content}
    </Link>
  );
};
