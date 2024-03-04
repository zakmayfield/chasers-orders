'use server';

import { FC } from 'react';
import Navbar from '../nav/Navbar';
import { LogoLink } from './LogoLink';

interface HeaderProps {}

const Header: FC<HeaderProps> = async ({}) => {
  return (
    <header className='px-6 py-3 font-light bg-light-primary'>
      <div className='w-3/4 flex items-center justify-between mx-auto'>
        <LogoLink />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
