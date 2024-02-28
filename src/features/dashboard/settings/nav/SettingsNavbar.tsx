import Link from 'next/link';
import { FC } from 'react';

interface SettingsNavbarProps {}

const SettingsNavbar: FC<SettingsNavbarProps> = ({}) => {
  return (
    <nav className='flex items-center gap-3 justify-center'>
      <Link href='/dashboard/settings'>Settings</Link>
      <Link href='/dashboard/settings/account'>Account</Link>
      <Link href='/dashboard/settings/contact'>Contact</Link>
      <Link href='/dashboard/settings/company'>Company</Link>
    </nav>
  );
};

export default SettingsNavbar;
