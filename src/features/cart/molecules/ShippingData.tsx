import { Container, Heading } from '@/shared/components/ui';
import { ShippingData as ShippingDataType } from '@/types/user';

export const ShippingData = ({
  shippingData,
}: {
  shippingData: ShippingDataType;
}) => {
  const {
    companyName,
    shippingAddress: { streetAddress, city, state, postalCode },
  } = shippingData;

  return (
    <Container
      as='div'
      flex='col'
      rounded='sm'
      padding='md'
      className='items-start bg-slate-50'
    >
      <Heading as='h6' content={companyName} />

      <Container as='div' flex='col' className='gap-1'>
        <Container as='p'>{streetAddress}</Container>

        <Container as='div' flex='row' className='gap-1'>
          <Container as='p'>{city},</Container>
          <Container as='p'>{state}</Container>
        </Container>

        <Container as='p'>{postalCode}</Container>
      </Container>
    </Container>
  );
};
