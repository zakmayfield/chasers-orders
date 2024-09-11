import { usePulseLoader } from '@/shared/components/loading';

export const VerificationQueryLoading = () => {
  const { PulseLoader } = usePulseLoader({ width: 'full', size: 'md' });
  return <PulseLoader />;
};
