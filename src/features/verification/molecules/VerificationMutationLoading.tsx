import { ContentWrapper, Text } from '@/shared/components/containers';
import { SpinLoader } from '@/shared/components/ui';

export const VerificationMutationLoading = () => {
  return (
    <ContentWrapper flex='row'>
      <SpinLoader />
      <Text as='p'>verifying email...</Text>
    </ContentWrapper>
  );
};
