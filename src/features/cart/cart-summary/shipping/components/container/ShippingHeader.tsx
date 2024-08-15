import { Dispatch, FC, SetStateAction } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { LoadingSpinner } from '@/shared/components';

interface ContainerHeaderProps {
  expanded?: boolean;
  isFetching?: boolean;
  error: Error | null;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

export const ShippingHeader: FC<ContainerHeaderProps> = ({
  expanded,
  isFetching,
  error,
  setExpanded,
}) => {
  function handleExpand() {
    setExpanded(!expanded);
  }
  return (
    <div className='flex items-center justify-between mb-6'>
      <h4>Shipping information</h4>

      {/* Render Spinner when fetching shipping info */}
      {isFetching ? (
        <div>
          <LoadingSpinner className='mx-auto' />
        </div>
      ) : (
        !error && (
          <button
            className={`text-slate-600 px-6 py-2 transform  ${expanded ? 'rotate-180' : ''}`}
            onClick={handleExpand}
          >
            <FaChevronDown />
          </button>
        )
      )}
    </div>
  );
};
