'use client';

import { getDashboardUser } from '@/services/queries/user.getDashboardUser';
import { DashboardUserData } from '@/types/types.dashboard';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
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
  const UserData = data && (
    <div className='flex flex-col gap-6'>
      {/* Account Status */}
      <div>
        <h2 className='font-bold tracking-wide'>Account status</h2>

        <div className='flex items-center gap-3'>
          <p>
            <span>Account approved: </span>
            <span>{data.isApproved ? '✅' : '🔴'}</span>
          </p>
          <p>
            <span>Email verified: </span>
            <span>{data.emailVerified ? '✅' : '🔴'}</span>
          </p>
        </div>
      </div>
      {/* Contact Details */}
      <div>
        <h2 className='font-bold tracking-wide'>Contact</h2>

        <div className='flex items-center gap-3'>
          <p>
            <span>Name: </span>
            <span>{data.contact.name}</span>
          </p>
          <p>
            <span>Phone number: </span>
            <span>{data.contact.phoneNumber}</span>
          </p>
          <p>
            <span>Position: </span>
            <span>{data.contact.position}</span>
          </p>
        </div>
      </div>
      {/* Company Details */}
      <div>
        <h2 className='font-bold tracking-wide'>Company</h2>

        <div className='flex items-center gap-3'>
          <p>
            <span>Name: </span>
            <span>{data.company.name}</span>
          </p>
          <p>
            <span>Payment method: </span>
            <span>{data.company.paymentMethod}</span>
          </p>
          <p>
            <span>Account payable: </span>
            <span>{data.company.accountPayableEmail}</span>
          </p>
        </div>
      </div>
      {/* Last order */}
      <div>
        <h2 className='font-bold tracking-wide'>Orders</h2>

        <div className='flex items-center gap-3'>
          <p>
            <span>Last order: </span>
            {data.orders.length < 1 && <span>N/A</span>}
            {data.orders.length > 0 &&
              data.orders.map(({ id, createdAt }) => (
                <span
                  key={id}
                  onClick={() =>
                    router.push(`/dashboard/recent-orders?orderId=${id}`)
                  }
                >
                  {new Date(createdAt).toDateString()}
                </span>
              ))}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {isLoading && LoadingData}
      {isError && ErrorData}
      {UserData}
    </div>
  );
};

function DashboardHomeLayout() {}

export default Dashboard;
