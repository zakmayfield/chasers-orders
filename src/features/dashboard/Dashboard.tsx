'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getDashboardUser } from '@/services/queries/user.getDashboardUser';
import { DashboardUserData } from '@/types/types.dashboard';
import GridContainer from '../ui/layout/GridContainer';

const Dashboard = () => {
  const { data, isLoading, error, isError } = useQuery<
    DashboardUserData,
    Error
  >({
    queryKey: ['user-dashboard'],
    queryFn: getDashboardUser,
    staleTime: 60 * 1000 * 5,
  });

  // TODO: Create loading skeleton after general layout is established
  const LoadingData = <div>Loading dashboard...</div>;
  const ErrorData = <div>{error && error.message}</div>;

  // TODO: Dashboard Home Component root path layout ( not to be confused with the server dashboard layout for the dashboard path )
  const UserData = data && <DashboardHomeLayout data={data} />;

  return (
    <div>
      {isLoading && LoadingData}
      {isError && ErrorData}
      {UserData}
    </div>
  );
};

function DashboardHomeLayout({ data }: { data: DashboardUserData }) {
  const router = useRouter();
  const lastOrderCreatedAt =
    data && data.orders.length !== 0 && new Date(data.orders[0].createdAt);

  const emailVerifiedDateString =
    data && data.emailVerified && new Date(data.emailVerified);

  return (
    <div className='font-extralight flex flex-col gap-12'>
      {/* //? DASHBOARD HOME SECTION ITEMS */}

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
            <span className='col-start-5 col-span-6 '>{data.email}</span>

            <span className='row-start-2 col-span-3 text-gray-700'>
              Email verification:{' '}
            </span>
            <span className='row-start-2 col-start-5 col-span-6 text-gray-500 text-sm italic underline'>
              Verified on {emailVerifiedDateString?.toLocaleDateString()}
            </span>

            <span className='col-span-3 text-gray-700'>Account approval: </span>
            <span className='col-start-5 col-span-6'>
              {data.isApproved ? '🟢' : '🔴'}
            </span>
          </div>
        </div>
      </div>

      {/* //^ Contact Details */}
      <div className='grid grid-cols-8 gap-3'>
        <div className='col-span-2 border-r p-6 h-full'>
          <p className='border-b inline-block text-lg text-gray-700'>Contact</p>
        </div>

        <div className='col-span-6 py-6 px-6'>
          <div className='flex flex-col'>
            <div className='grid grid-cols-10 gap-3'>
              <span className='col-span-3 text-gray-700'>Name: </span>
              <span className='col-start-5 col-span-6'>
                {data.contact.name}
              </span>

              <span className='row-start-2 col-span-4 text-gray-700'>
                Phone number:{' '}
              </span>
              <span className='row-start-2 col-start-5 col-span-6'>
                {data.contact.phoneNumber}
              </span>

              <span className='row-start-3 col-span-4 text-gray-700'>
                Position:{' '}
              </span>
              <span className='row-start-3 col-start-5 col-span-6'>
                {data.contact.position ? (
                  data.contact.position
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
                {data.company.name}
              </span>

              <span className='row-start-2 col-span-4 text-gray-700'>
                Account payable email:{' '}
              </span>
              <span className='row-start-2 col-start-5 col-span-6'>
                {data.company.accountPayableEmail}
              </span>

              <span className='row-start-3 col-span-4 text-gray-700'>
                Payment method:{' '}
              </span>
              <span className='row-start-3 col-start-5 col-span-6'>
                {data.company.paymentMethod}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* //^ Recent Orders */}
      <div className='grid grid-cols-8 gap-3'>
        <div className='col-span-2 border-r p-6 h-full'>
          <p className='border-b inline-block text-lg text-gray-700'>
            Recent Orders
          </p>
        </div>

        <div className='col-span-6 pt-6 mx-6'>
          <div className='grid grid-cols-10 gap-3'>
            <div className='col-span-10'>
              {data.orders.length !== 0 ? (
                <span>
                  {lastOrderCreatedAt &&
                    lastOrderCreatedAt.toLocaleDateString()}
                </span>
              ) : (
                <span>
                  first time?{' '}
                  <Link href='/products' className='underline text-purple-800'>
                    visit our shop
                  </Link>{' '}
                  to get started
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
