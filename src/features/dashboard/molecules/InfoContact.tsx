import { Container, Heading } from '@/shared/components/ui';
import { TContact } from '@/shared/types/User';

export const InfoContact = ({ contact }: { contact: TContact }) => {
  return (
    <Container as='div' flex='col'>
      <Heading as='h5' content='Contact' />
      <Container as='div' flex='col' paddingX='lg'>
        <Container as='div' flex='row' className='border-b'>
          <Container as='p' width='xs'>
            Name:
          </Container>{' '}
          <Container as='p' className='italic text-gray-600'>
            {contact.name}
          </Container>
        </Container>

        <Container as='div' flex='row' className='border-b'>
          <Container as='p' width='xs'>
            Position:
          </Container>{' '}
          <Container as='p' className='italic text-gray-600'>
            {contact.position || 'N/A'}
          </Container>
        </Container>

        <Container as='div' flex='row' className='border-b'>
          <Container as='p' width='xs'>
            Phone Number:
          </Container>{' '}
          <Container as='p' className='italic text-gray-600'>
            {contact.phoneNumber}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
