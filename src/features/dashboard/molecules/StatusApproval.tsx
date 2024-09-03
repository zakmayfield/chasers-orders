import { Container, Heading, Icon } from '@/shared/components/ui';
import { TUserExtendedAuthorization } from '@/shared/types/User';
import { CheckCircleDuotone, XCircleDuotone } from '@/shared/utils/ui';

export const StatusApproval = ({
  status,
}: {
  status: TUserExtendedAuthorization;
}) => {
  return (
    <Container as='div' flex='col' className='gap-1'>
      <Heading as='h6' content='Account approval:' />
      <Container as='div' flex='row'>
        {status.is_approved ? (
          <Icon IconData={CheckCircleDuotone} iconClass='text-green-500' />
        ) : (
          <Icon IconData={XCircleDuotone} iconClass='text-red-500' />
        )}
        <Container as='p'>
          {status.is_approved ? 'Approved' : 'Pending approval'}
        </Container>
      </Container>
    </Container>
  );
};
