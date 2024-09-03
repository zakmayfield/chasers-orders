import { Container, Heading, Icon } from '@/shared/components/ui';
import { TUserExtendedAuthorization } from '@/shared/types/User';
import { CheckCircleDuotone, XCircleDuotone } from '@/shared/utils/ui';

export const StatusApproval = ({
  status,
}: {
  status: TUserExtendedAuthorization;
}) => {
  return (
    <Container as='div' flex='col' gap='sm' className='border-b'>
      <Heading as='h5' content='Account approval:' />
      <Container as='div' flex='row' paddingX='lg'>
        {status.is_approved ? (
          <Icon
            IconData={CheckCircleDuotone}
            iconClass='text-green-500'
            width='xs'
          />
        ) : (
          <Icon IconData={XCircleDuotone} iconClass='text-red-500' width='xs' />
        )}
        <Container as='p' className='italic text-gray-600'>
          {status.is_approved ? 'Approved' : 'Pending approval'}
        </Container>
      </Container>
    </Container>
  );
};
