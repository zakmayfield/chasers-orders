'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function UserNav() {
  return (
    <div className='flex items-center gap-6'>
      <Link href='/cart'>Cart</Link>
      <Link href='/profile'>Profile</Link>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
