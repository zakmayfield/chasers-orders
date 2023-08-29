'use client';
import { signOut } from 'next-auth/react';

export default function UserNav() {
  return <button onClick={() => signOut()}>Logout</button>;
}
