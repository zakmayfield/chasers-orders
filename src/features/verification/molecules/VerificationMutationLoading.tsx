import { Container, SpinLoader } from '@/shared/components/ui';

export const VerificationMutationLoading = () => {
  return (
    <Container as='div' flex='row' className='items-center'>
      <SpinLoader />
      <Container as='p'>verifying email...</Container>
    </Container>
  );
};
