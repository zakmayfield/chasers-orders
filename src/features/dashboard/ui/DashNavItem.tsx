import Link from 'next/link';
import { DashboardNavItem } from './dashboardNavData';
import { useEffect, useState } from 'react';

const DashNavItem = ({
  item,
  pathname,
}: {
  item: DashboardNavItem;
  pathname: string;
}) => {
  const basePath = '/dashboard';
  const itemPath = item.path;
  const route = basePath + itemPath;
  const isActive =
    pathname === route || (route !== basePath && pathname.startsWith(route));

  const [active, setActive] = useState(false);

  useEffect(() => {
    const isActive =
      pathname === route || (route !== basePath && pathname.startsWith(route));

    setActive(isActive);
  }, [pathname]);

  return (
    <Link
      key={item.content}
      href={route}
      id={(!active && 'pulse-animate') || ''}
      className={`
        py-3 pl-4
        rounded-lg 
        ${active ? 'bg-light-greenish hover:bg-light-greenish/75' : 'hover:bg-light-greenish/20'}`}
    >
      <div className='flex items-center gap-4 tracking-wide'>
        <span>{item.icon}</span>
        <span
          className={`
            ${active ? 'font-normal' : ''}
        `}
        >
          {item.content}
        </span>
      </div>
    </Link>
  );
};

export default DashNavItem;
