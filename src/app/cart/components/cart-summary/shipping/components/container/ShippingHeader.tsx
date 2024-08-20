import { FC } from 'react';
import { Heading, LoadingSpinner } from '@/shared/components/ui';
import { DownArrow } from '@/utils/icons';

interface ContainerHeaderProps {
  isFetching: boolean;
  error: Error | null;
  expanded: boolean;
  handleExpand(): void;
}

export const ShippingHeader: FC<ContainerHeaderProps> = ({
  expanded,
  isFetching,
  error,
  handleExpand,
}) => {
  return (
    <div className='flex items-center justify-between mb-6'>
      <Heading as='h4' content='Shipping Information' />

      {isFetching ? (
        <div className='px-6'>
          <LoadingSpinner />
        </div>
      ) : (
        !error && (
          <button
            className={`text-slate-600 px-6 transform ${expanded && 'rotate-180'}`}
            onClick={handleExpand}
          >
            <DownArrow />
          </button>
        )
      )}
    </div>
  );
};
