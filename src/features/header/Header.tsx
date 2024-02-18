'use server';

import { FC } from 'react';
import { getAuthSession } from '@/lib/auth/auth.options';

import Nav from '../nav/Nav';

interface HeaderProps {}

const Header: FC<HeaderProps> = async ({}) => {
  const session = await getAuthSession();

  return (
    <header className='py-6 px-6 font-light bg-slate-50'>
      <div className='w-3/4 flex items-center justify-between py-6 mx-auto'>
        {/* Company Logo */}
        <div>{'{{logo}}'}</div>

        {/* Nav Bar */}
        <Nav />
      </div>
    </header>
  );
};

export default Header;
