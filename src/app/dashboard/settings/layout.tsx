import Link from 'next/link';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <nav className='flex items-center gap-3 justify-center'>
          <Link href='/dashboard/settings'>Settings</Link>
          <Link href='/dashboard/settings/account'>Account</Link>
          <Link href='/dashboard/settings/contact'>Contact</Link>
          <Link href='/dashboard/settings/company'>Company</Link>
        </nav>
      </div>

      <div>{children}</div>
    </div>
  );
}
