'use client';
import Link from 'next/link';
import { UserData } from '@/types/user';
import { useDashboardData } from '@/shared/hooks/data';

export default function Company() {
  const { fetchState, isLoading, isData, isError } =
    useDashboardData<UserData['company']>('company');

  const OnLoad = isLoading && (
    <div>
      <p>Loading account data...</p>
    </div>
  );

  const ErrorInfo = fetchState && isError(fetchState) && (
    <div className='foobar'>
      <p>{fetchState.error}</p>
    </div>
  );

  const ContactInfo = fetchState && isData(fetchState) && (
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
      {OnLoad}
      {ErrorInfo}
      {ContactInfo}
    </div>
  );
}
