import Link from 'next/link';
import { DashboardNavItem } from './dashboardNavData';

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

  return (
    <div className='text-dark-text tracking-wide'>
      <Link
        key={item.content}
        href={route}
        className={`rounded-lg py-3 pl-4 flex items-center gap-4 text-sky-200 ${
          isActive && 'bg-dark-greenish/50'
        }`}
      >
        <span className='text-2xl'>{item.icon}</span>
        <span className='text-sm'>{item.content}</span>
      </Link>
    </div>
  );
};

export default DashNavItem;
