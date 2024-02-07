'use client';

import Link from 'next/link';

export default function Company() {
  return (
    <div>
      <p>Company Data</p>
      <Link href='/dashboard/settings/company/edit'>Edit</Link>
    </div>
  );
}
