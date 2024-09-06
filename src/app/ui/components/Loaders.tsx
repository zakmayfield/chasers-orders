'use client';
import {
  PulseLoader,
  SpinLoader,
  usePulseLoader,
  useSpinLoader,
} from '@/shared/components/loading';
import { UiFeatureLayout } from '../UiFeatureLayout';

export const Loaders = () => {
  const { SpinLoader: Spinner } = useSpinLoader({});
  const { PulseLoader: Pulser } = usePulseLoader({});

  return (
    <UiFeatureLayout title='Loaders'>
      <h3>Spin</h3>
      <div className='flex gap-3'>
        <SpinLoader size='sm' />
        <SpinLoader size='md' />
        <SpinLoader size='lg' />
      </div>

      <div className='flex gap-3'>
        <div className='max-w-[7.5rem] w-full border rounded'>
          <SpinLoader size='md' width='full' position='left' />
        </div>
        <div className='max-w-[7.5rem] w-full border rounded'>
          <SpinLoader size='md' width='full' position='center' />
        </div>
        <div className='max-w-[7.5rem] w-full border rounded'>
          <SpinLoader size='md' width='full' position='right' />
        </div>
      </div>

      <div className='flex gap-3'>
        <div className='max-w-[7.5rem] w-full border rounded bg-slate-500'>
          <SpinLoader
            size='md'
            width='full'
            position='center'
            padding='sm'
            theme='dark'
          />
        </div>
        <div className='max-w-[7.5rem] w-full border rounded'>
          <SpinLoader
            size='md'
            width='full'
            position='center'
            padding='sm'
            theme='light'
          />
        </div>
      </div>
      <h6>Hook</h6>
      <Spinner />

      <h3>Pulse</h3>
      <PulseLoader size='sm' />
      <PulseLoader size='md' />
      <PulseLoader size='lg' />
      <h6>Hook</h6>
      <Pulser />
    </UiFeatureLayout>
  );
};
