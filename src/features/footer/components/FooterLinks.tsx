'use client';

import { FC } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface FooterLinksProps {}

export const FooterLinks: FC<FooterLinksProps> = ({}) => {
  return (
    <div className='flex flex-col gap-3'>
      <div>
        <h6 className='mb-1'>Navigation</h6>
        <FooterNav />
      </div>

      <div>
        <h6 className='mb-1'>Socials</h6>
        <FooterSocials />
      </div>
    </div>
  );
};

function FooterNav() {
  return (
    <nav className='flex gap-3 bg-light-secondary rounded-lg py-2 px-4'>
      <Link href='/products'>Shop</Link>
      <Link href='/cart'>Cart</Link>
      <Link href='/dashboard'>Dashboard</Link>
      <button onClick={() => signOut()}>Logout</button>
    </nav>
  );
}

function FooterSocials() {
  return (
    <div className='flex'>
      <div className='flex gap-3 bg-light-secondary py-2 px-4 rounded-lg'>
        <a href='#'>x</a>
        <a href='#'>y</a>
      </div>
    </div>
  );
}
