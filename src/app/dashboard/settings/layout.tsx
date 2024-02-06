import Link from 'next/link';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <nav className='flex items-center gap-3'>
          <Link href='/dashboard/settings/account'>Account</Link>
          <Link href='/dashboard/settings/company'>Company</Link>
        </nav>
      </div>

      <div>{children}</div>
    </div>
  );
}
