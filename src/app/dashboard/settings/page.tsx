import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <div className='mb-3'>Settings</div>

      <div className='flex flex-col gap-6'>
        <div>
          <h2>Account</h2>
          <p>{`{account}`}</p>
          <Link href='/dashboard/settings/account/edit'>Edit</Link>
        </div>

        <div>
          <h2>Contact</h2>
          <p>{`{contact}`}</p>
          <Link href='/dashboard/settings/contact/edit'>Edit</Link>
        </div>

        <div>
          <h2>Company</h2>
          <p>{`{company}`}</p>
          <Link href='/dashboard/settings/company/edit'>Edit</Link>
        </div>
      </div>
    </div>
  );
}
