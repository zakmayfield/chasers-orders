'use client';

import Link from 'next/link';
import { useDashboardQuery } from '@/shared/hooks/query.hooks';
import { UserData } from '@/types/user';

export default function Settings() {
  const { fetchState, isLoading, isData, isError } =
    useDashboardQuery<UserData>();

  const LoadingData = isLoading && <div>Loading...</div>;

  const ErrorData = fetchState && isError(fetchState) && (
    <div>{fetchState.error}</div>
  );

  const emailVerifiedDate =
    fetchState && isData(fetchState) && fetchState.emailVerified;

  const SettingsData = fetchState && isData(fetchState) && (
    <div className='flex flex-col gap-12'>
      {/* //^ Account Status */}
      <div className='grid grid-cols-8 gap-3'>
        <div className='col-span-2 border-r p-6'>
          <p className='border-b inline-block text-lg text-gray-700'>
            Account Status
          </p>
        </div>

        <div className='col-span-6 p-6'>
          <div className='grid grid-cols-10 gap-3'>
            <span className='col-span-3 text-gray-700'>Email: </span>
            <span className='col-start-5 col-span-6 '>{fetchState?.email}</span>

            <span className='row-start-2 col-span-3 text-gray-700'>
              Email verification:{' '}
            </span>
            <span className='row-start-2 col-start-5 col-span-6 text-gray-500 text-sm italic'>
              Verified on{' '}
              {emailVerifiedDate ? emailVerifiedDate.toLocaleString() : '🔴'}
            </span>

            <span className='col-span-3 text-gray-700'>Account approval: </span>
            <span className='col-start-5 col-span-6'>
              {fetchState.isApproved ? '🟢' : '🔴'}
            </span>
          </div>
        </div>
      </div>

      {/* //^ Contact Details */}
      <div className='grid grid-cols-8 gap-3'>
        <div className='col-span-2 border-r p-6'>
          <p className='border-b inline-block text-lg text-gray-700'>Contact</p>
        </div>

        <div className='col-span-6 py-6 px-6'>
          <div className='flex flex-col'>
            <div className='grid grid-cols-10 gap-3'>
              <span className='col-span-3 text-gray-700'>Name: </span>
              <span className='col-start-5 col-span-6'>
                {fetchState.contact.name}
              </span>

              <span className='row-start-2 col-span-4 text-gray-700'>
                Phone number:{' '}
              </span>
              <span className='row-start-2 col-start-5 col-span-6'>
                {fetchState.contact.phoneNumber}
              </span>

              <span className='row-start-3 col-span-4 text-gray-700'>
                Position:{' '}
              </span>
              <span className='row-start-3 col-start-5 col-span-6'>
                {fetchState.contact.position ? (
                  fetchState.contact.position
                ) : (
                  <Link
                    href='/dashboard/settings/contact/edit'
                    className='underline text-purple-900'
                  >
                    add position
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>

        <Link
          href='/dashboard/settings/contact/edit'
          className='underline text-purple-800 col-start-7 text-center'
        >
          edit
        </Link>
      </div>

      {/* //^ Company Details */}
      <div className='grid grid-cols-8 gap-3'>
        <div className='col-span-2 border-r p-6 h-full'>
          <p className='border-b inline-block text-lg text-gray-700'>Company</p>
        </div>

        <div className='col-span-6 pt-6 mx-6'>
          <div className='flex flex-col'>
            <div className='grid grid-cols-10 gap-3'>
              <span className='col-span-4 text-gray-700'>Name: </span>
              <span className='col-start-5 col-span-6'>
                {fetchState.company.name}
              </span>

              <span className='row-start-2 col-span-4 text-gray-700'>
                Account payable email:{' '}
              </span>
              <span className='row-start-2 col-start-5 col-span-6'>
                {fetchState.company.accountPayableEmail}
              </span>

              <span className='row-start-3 col-span-4 text-gray-700'>
                Payment method:{' '}
              </span>
              <span className='row-start-3 col-start-5 col-span-6'>
                {fetchState.company.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        <Link
          href='/dashboard/settings/company/edit'
          className='underline text-purple-800 col-start-7 text-center'
        >
          edit
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      {LoadingData}
      {ErrorData}
      {SettingsData}
    </div>
  );
}
