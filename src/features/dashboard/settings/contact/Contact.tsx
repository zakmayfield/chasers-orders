import Link from 'next/link';

export default function Contact() {
  return (
    <div>
      <p>Contact Data</p>
      <Link href='/dashboard/settings/contact/edit'>Edit</Link>
    </div>
  );
}
