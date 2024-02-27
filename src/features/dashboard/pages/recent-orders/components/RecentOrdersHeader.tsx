import { PiSpinnerGapThin } from 'react-icons/pi';

function RecentOrdersHeader({ isLoading }: { isLoading: boolean }) {
  function Spinner() {
    return (
      <span className='ml-3'>
        <PiSpinnerGapThin className='text-xl animate-spin' />
      </span>
    );
  }

  return (
    <h2 className='flex items-center mb-6'>
      Recent Orders {isLoading && <Spinner />}
    </h2>
  );
}

export default RecentOrdersHeader;
