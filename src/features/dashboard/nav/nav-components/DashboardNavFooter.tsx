import Link from 'next/link';
import { PiWarningDuotone } from 'react-icons/pi';
import { useGetUser } from '@/shared/hooks/queries';

export const DashboardNavFooter = () => {
  const { data, isLoading, isError } = useGetUser();

  if (isLoading) {
    return (
      <div
        className={`
        hidden
        h-20 py-3 px-6 w-full
        bg-light-secondary
        2xl:flex 2xl:items-center 2xl:gap-3 2xl:px-6 2xl:w-full 2xl:h-20
      `}
      >
        <div>
          <p
            className={`
              rounded-full w-10 h-10
              animate-pulse
              bg-light-accent/80
            `}
          ></p>
        </div>

        <div className='w-full flex flex-col gap-1'>
          <p
            className={`
              rounded h-6
              animate-pulse 
              bg-light-accent/80
            `}
          ></p>
          <p
            className={`
              rounded h-3 w-3/4
              animate-pulse 
              bg-light-accent/60
            `}
          ></p>
        </div>
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div
        className={`
        h-20 py-3 px-6 
        flex items-center gap-3
        bg-light-secondary
      `}
      >
        <div className='text-2xl'>
          <PiWarningDuotone className='text-yellow-500' />
        </div>
        <p className='text-red-700 text-sm'>could not locate user</p>
      </div>
    );
  }

  return (
    <div
      className={` 
        h-20 w-full px-3 flex items-center justify-center bg-light-secondary
        2xl:flex 2xl:items-center 2xl:justify-start 2xl:gap-3 2xl:px-6
      `}
    >
      {/* "PFP" */}
      <div>
        <p
          className={`
              rounded-full w-10 h-10
              flex justify-center
              text-2xl
              bg-light-primary
            `}
        >
          {data?.email.split('')[0]}
        </p>
      </div>

      {/* CONTACTS EMAIL & POSITION */}
      <div className='hidden 2xl:flex 2xl:flex-col 2xl:gap-1'>
        {/* Overflow control container */}
        <div>
          <p
            className={`
              overflow-hidden text-ellipsis w-full
              text-sm
            `}
          >
            {data?.email}
          </p>
        </div>
        {!data?.contact.position ? (
          <p
            className={`
              rounded
              text-sm
            `}
          >
            {data?.contact.position}
          </p>
        ) : (
          <Link
            href='/dashboard'
            className=' text-sm underline text-purple-800'
          >
            add position
          </Link>
        )}
      </div>
    </div>
  );
};
