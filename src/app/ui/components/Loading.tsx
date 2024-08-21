import { LoadingSpinner, PulseLoader } from '@/shared/components/ui';

export const Loading = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='border-b'>Loading</h1>

      <div className='flex flex-col gap-3'>
        <LoadingSpinner />
        <PulseLoader />
        <PulseLoader rows='multi' width='md' />
      </div>
    </div>
  );
};
