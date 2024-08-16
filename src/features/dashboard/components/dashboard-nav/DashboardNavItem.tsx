import Link from 'next/link';
import { DashboardNavItem } from './navData';
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

  const [active, setActive] = useState(false);

  useEffect(() => {
    const isActive =
      pathname === route || (route !== basePath && pathname.startsWith(route));

    setActive(isActive);
  }, [route, pathname]);

  return (
    <Link
      key={item.content}
      href={route}
      className={`
        py-2 px-4
        rounded-lg 
        2xl:w-full
        ${active ? 'bg-light-green-400 hover:bg-light-green-300' : 'hover:bg-light-green-50/50'}`}
    >
      <div className='flex items-center gap-4 tracking-wide'>
        <span className='text-2xl 2xl:text-lg'>{item.icon}</span>
        <span
          className={`
          hidden text-sm
          2xl:inline-block 2xl:text-base
        `}
        >
          {item.content}
        </span>
      </div>
    </Link>
  );
};

export default DashNavItem;
