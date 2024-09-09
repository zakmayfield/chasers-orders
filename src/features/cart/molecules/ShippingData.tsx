import { Container, Heading } from '@/shared/components/ui';
import { TCompanyWithAddress } from '@/shared/types/User';

export const ShippingData = ({ company }: { company: TCompanyWithAddress }) => {
  const { name, shipping } = company;

  return (
    <Container
      as='div'
      flex='col'
      rounded='sm'
      padding='md'
      className='items-start bg-slate-50'
    >
      <Heading as='h6' content={name} />

      <Container as='div' flex='col' className='gap-1'>
        <Container as='p'>{shipping?.streetAddress}</Container>

        <Container as='div' flex='row' className='gap-1'>
          <Container as='p'>{shipping?.city},</Container>
          <Container as='p'>{shipping?.state}</Container>
        </Container>

        <Container as='p'>{shipping?.postalCode}</Container>
      </Container>
    </Container>
  );
};
