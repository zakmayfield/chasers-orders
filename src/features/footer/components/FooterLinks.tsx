'use client';

import { FC } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface FooterLinksProps {}

export const FooterLinks: FC<FooterLinksProps> = ({}) => {
  return (
    <div className='flex flex-col gap-3'>
      <div>
        <p>Navigation</p>
        <FooterNav />
      </div>

      <div>
        <p>Socials</p>
        <FooterSocials />
      </div>
    </div>
  );
};

function FooterNav() {
  return (
    <nav className='flex gap-3 bg-light-secondary rounded-lg p-2'>
      <Link href='/products' className='underline'>
        Shop
      </Link>
      <Link href='/cart' className='underline'>
        Cart
      </Link>
      <Link href='/dashboard' className='underline'>
        Dashboard
      </Link>
      <button onClick={() => signOut()} className='underline'>
        Logout
      </button>
    </nav>
  );
}

function FooterSocials() {
  return (
    <div className='flex gap-3 bg-light-secondary rounded-lg p-2 '>
      <a href='#'>x</a>
      <a href='#'>y</a>
    </div>
  );
}
