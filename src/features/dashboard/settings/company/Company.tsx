'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getDashboardUserData } from '@/store/user/user.getDashboardUserData';
import {
  DashboardCompany,
  DashboardQueryError,
  DashboardUserData,
} from '@/types/types.dashboard';

type CompanyFetchState = DashboardCompany | DashboardQueryError | null;

export default function Company() {
  const queryClient = useQueryClient();
  const [fetchState, setFetchState] = useState<CompanyFetchState>(null);

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

        const { company } = data;

        setFetchState(company);
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
  function isCompanyData(data: unknown): data is DashboardCompany {
    return !!data && typeof data === 'object' && 'id' in data;
  }

  const ErrorInfo = fetchState && isError(fetchState) && (
    <div className='foobar'>
      <p>{fetchState.error}</p>
    </div>
  );

  const ContactInfo = fetchState && isCompanyData(fetchState) && (
    <div>
      {/* Company General */}
      <div className='py-3'>
        <h2>Company Information</h2>

        <p>
          <span>Name: </span>
          <span>{fetchState.name}</span>
        </p>
        <p>
          <span>Payment Method: </span>
          <span>{fetchState.paymentMethod}</span>
        </p>
        <p>
          <span>Account Payable Email: </span>
          <span>{fetchState.accountPayableEmail}</span>
        </p>
      </div>

      {/* Shipping + Billing */}
      <div className='flex items-start gap-6'>
        <div className='py-3'>
          <h2>Shipping Address</h2>

          <p>{fetchState.shippingAddress.streetAddress}</p>
          <p>
            <span>{fetchState.shippingAddress.city}</span>,{' '}
            <span>{fetchState.shippingAddress.state}</span>
          </p>
          <p>
            <span>{fetchState.shippingAddress.postalCode}</span>, Canada
          </p>
        </div>

        <div className='py-3'>
          <h2>Billing Address</h2>

          <p>{fetchState.billingAddress.streetAddress}</p>
          <p>
            <span>{fetchState.billingAddress.city}</span>,{' '}
            <span>{fetchState.billingAddress.state}</span>
          </p>
          <p>
            <span>{fetchState.billingAddress.postalCode}</span>, Canada
          </p>
        </div>
      </div>

      <Link href='/dashboard/settings/contact/edit'>Edit</Link>
    </div>
  );

  return (
    <div>
      <p>Company Data</p>
      {ErrorInfo}
      {ContactInfo}
    </div>
  );
}
