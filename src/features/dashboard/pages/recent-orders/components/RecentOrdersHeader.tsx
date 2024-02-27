import LoadingSpinner from '@/features/spinner/LoadingSpinner';
import { PiSpinnerGapThin } from 'react-icons/pi';

function RecentOrdersHeader({ isLoading }: { isLoading: boolean }) {
  return (
    <h2 className='flex items-center mb-6'>
      Recent Orders {isLoading && <LoadingSpinner />}
    </h2>
  );
}

export default RecentOrdersHeader;
