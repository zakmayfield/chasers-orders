import { Heading } from '@/shared/components/ui';
import { CheckIcon } from '@/shared/utils/ui';
import { ReturnToDashboardButton } from '../atoms/ReturnToDashboardButton';
import {
  TUpdateVerificationResponse,
  TUserExtendedAuthorization,
} from '@/shared/types/User';
import { ContentWrapper, Text } from '@/shared/components/containers';

export const VerificationData = ({
  data,
  authorization,
}: {
  data: TUpdateVerificationResponse | undefined;
  authorization: TUserExtendedAuthorization | undefined;
}) => {
  return (
    <ContentWrapper flex='col'>
      <Heading
        as='h5'
        content='Email Verification Successful'
        className='text-green-600'
      />

      <ContentWrapper flex='row'>
        <Text as='span'>
          <CheckIcon className='text-green-500 text-xl' />
        </Text>
        <Text as='span'>{data?.email ? data.email : authorization?.email}</Text>
      </ContentWrapper>

      <ReturnToDashboardButton />
    </ContentWrapper>
  );
};
