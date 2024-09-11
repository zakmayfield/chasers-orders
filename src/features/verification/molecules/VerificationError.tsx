import { ContentWrapper, Text } from '@/shared/components/containers';
import { Heading } from '@/shared/components/ui';

export const VerificationError = ({
  errorMessage,
}: {
  errorMessage: string;
}) => {
  return (
    <ContentWrapper flex='col'>
      <Heading as='h5' content='Error' className='text-red-500' />
      <Text>{errorMessage}</Text>
    </ContentWrapper>
  );
};
