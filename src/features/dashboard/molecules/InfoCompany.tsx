import { Container, Heading } from '@/shared/components/ui';
import { TCompany } from '@/shared/types/User';

export const InfoCompany = ({ company }: { company: TCompany }) => {
  return (
    <Container as='div' flex='col'>
      <Heading as='h5' content='Company' />
      <Container as='div' flex='col' paddingX='lg'>
        <Container as='div' flex='row' className='border-b'>
          <Container as='p' width='xs'>
            Name:
          </Container>{' '}
          <Container as='p' className='italic text-gray-600'>
            {company.name}
          </Container>
        </Container>

        <Container as='div' flex='row' className='border-b'>
          <Container as='p' width='xs'>
            Payment Method:
          </Container>{' '}
          <Container as='p' className='italic text-gray-600'>
            {company.paymentMethod}
          </Container>
        </Container>

        <Container as='div' flex='row' className='border-b'>
          <Container as='p' width='xs'>
            Account Payable:
          </Container>{' '}
          <Container as='p' className='italic text-gray-600'>
            {company.accountPayableEmail}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
