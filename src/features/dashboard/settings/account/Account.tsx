import Link from 'next/link';

export default function Account() {
  return (
    <div>
      <p>Account Data</p>
      <Link href='/dashboard/settings/account/edit'>Edit</Link>
    </div>
  );
}
