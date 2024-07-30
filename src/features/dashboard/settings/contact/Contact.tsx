'use client';
import Link from 'next/link';
import { DashboardContact } from '@/types/types.dashboard';
import { useDashboardQuery } from '@/hooks/query.hooks';

export default function Contact() {
  const { fetchState, isLoading, isData, isError } =
    useDashboardQuery<DashboardContact>('contact');

  const OnLoad = isLoading && (
    <div>
      <p>Loading contact data...</p>
    </div>
  );

  const ErrorInfo = fetchState && isError(fetchState) && (
    <div className='foobar'>
      <p>{fetchState.error}</p>
    </div>
  );

  const ContactInfo = fetchState && isData(fetchState) && (
    <div>
      <div className='py-3'>
        <p>
          <span>Name: </span>
          <span>{fetchState.name}</span>
        </p>

        <p>
          <span>Phone Number: </span>
          <span>{fetchState.phoneNumber}</span>
        </p>
        <p>
          <span>Position: </span>
          <span>{fetchState.position}</span>
        </p>
      </div>

      <Link href='/dashboard/settings/contact/edit'>Edit</Link>
    </div>
  );

  return (
    <div>
      <p>Contact Data</p>
      {OnLoad}
      {ErrorInfo}
      {ContactInfo}
    </div>
  );
}
