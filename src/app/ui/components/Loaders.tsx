import { PulseLoader } from '@/shared/components/loading';
import { UiFeatureLayout } from '../UiFeatureLayout';

export const Loaders = () => {
  return (
    <UiFeatureLayout title='Loaders'>
      <h3>Spin</h3>

      <h3>Pulse</h3>
      <PulseLoader size='sm' />
      <PulseLoader size='md' />
      <PulseLoader size='lg' />
    </UiFeatureLayout>
  );
};
