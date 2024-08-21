import { SpinLoader, PulseLoader } from '@/shared/components/ui';

export const Loading = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='border-b'>Loading</h1>

      <div className='flex flex-col gap-3'>
        <h3>Spin</h3>
        <div className='flex items-start gap-3'>
          <SpinLoader />
          <SpinLoader size='md' />
          <SpinLoader size='lg' />
        </div>

        <h3>Pulse</h3>
        <PulseLoader />
        <PulseLoader rows='multi' width='md' />
      </div>
    </div>
  );
};
