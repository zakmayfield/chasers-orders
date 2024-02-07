'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getDashboardUserData } from '@/store/user/user.getDashboardUserData';
import {
  DashboardContact,
  DashboardQueryError,
  DashboardUserData,
} from '@/types/types.user';

type ContactFetchState = DashboardContact | DashboardQueryError | null;

export default function Contact() {
  const queryClient = useQueryClient();
  const [fetchState, setFetchState] = useState<ContactFetchState>(null);

  useEffect(() => {
    (async () => {
      try {
        const data: DashboardUserData | undefined =
          await queryClient.fetchQuery(
            ['user-dashboard'],
            getDashboardUserData,
            { staleTime: 60 * 1000 * 5 }
          );

        if (!data) {
          setFetchState({ error: 'Could not access contact data.' });
          return;
        }

        const { contact } = data;

        setFetchState(contact);
      } catch (error) {
        if (error instanceof Error) {
          setFetchState({ error: error.message });
          console.error(error);
        }
      }
    })();
  }, [queryClient]);

  function isError(data: unknown): data is DashboardQueryError {
    return !!data && typeof data === 'object' && 'error' in data;
  }
  function isContactData(data: unknown): data is DashboardContact {
    return !!data && typeof data === 'object' && 'id' in data;
  }

  const ErrorInfo = fetchState && isError(fetchState) && (
    <div className='foobar'>
      <p>{fetchState.error}</p>
    </div>
  );

  const ContactInfo = fetchState && isContactData(fetchState) && (
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
      {ErrorInfo}
      {ContactInfo}
    </div>
  );
}
