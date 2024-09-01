'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { NavItem } from './Navigation';

interface NavigationItemProps {
  navItem: NavItem;
  pathname: string;
}

export const NavigationItem: FC<NavigationItemProps> = ({
  navItem,
  pathname,
}) => {
  const basePath = '';
  const itemPath = navItem.path;
  const route = basePath + itemPath;

  const [active, setActive] = useState(false);

  useEffect(() => {
    const isActive =
      pathname === route || (route !== basePath && pathname.startsWith(route));

    setActive(isActive);
  }, [route, pathname]);

  return (
    <Link
      href={itemPath}
      className={`rounded px-1 ${active ? 'underline' : 'hover:ring-2'}`}
    >
      {navItem.content}
    </Link>
  );
};
