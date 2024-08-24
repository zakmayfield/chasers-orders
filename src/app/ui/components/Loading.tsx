import { SpinLoader, PulseLoader } from '@/shared/components/ui';
import { UiFeatureLayout } from '../UiFeatureLayout';

export const Loading = () => {
  return (
    <UiFeatureLayout title='Loading' flex='col'>
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
    </UiFeatureLayout>
  );
};
