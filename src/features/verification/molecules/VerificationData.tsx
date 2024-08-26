import { Container, Heading } from '@/shared/components/ui';
import { CheckIcon } from '@/shared/utils/ui';
import { ReturnToDashboardButton } from '../atoms/ReturnToDashboardButton';
import { TUserExtendedAuthorization } from '@/shared/types/User';
import { TUpdateUserVerificationResponse } from '@/shared/types/API';

export const VerificationData = ({
  data,
  authorization,
}: {
  data: TUpdateUserVerificationResponse | undefined;
  authorization: TUserExtendedAuthorization | undefined;
}) => {
  return (
    <Container as='div' flex='col'>
      <Heading
        as='h5'
        content='Email Verification Successful'
        className='text-green-600'
      />

      <Container as='div' flex='row'>
        <Container as='span'>
          <CheckIcon className='text-green-500 text-xl' />
        </Container>
        <Container as='span'>
          {data?.email ? data.email : authorization?.email}
        </Container>
      </Container>

      <ReturnToDashboardButton />
    </Container>
  );
};
