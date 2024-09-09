import { Container, Heading, SpinLoader } from '@/shared/components/ui';
import { useGetShippingAddress } from '@/shared/hooks/data';
import { ShippingDropDownArrow } from '../../atoms/shipping/ShippingDropDownArrow';

export const ShippingHeading = ({
  toggleOpen,
  isOpen,
}: {
  toggleOpen(): void;
  isOpen: boolean;
}) => {
  const shipping = useGetShippingAddress();

  const canOpen = shipping.data && !shipping.error && !shipping.isLoading;
  const handleOpen = () => canOpen && toggleOpen();

  const loading = shipping.isLoading && <SpinLoader />;
  const dropDownArrow = shipping.data &&
    !shipping.error &&
    !shipping.isLoading && (
      <ShippingDropDownArrow
        handleOpen={handleOpen}
        canOpen={canOpen}
        isOpen={isOpen}
      />
    );

  return (
    <Container as='div' flex='row' className='mb-3 justify-between'>
      <Heading as='h5' content='Shipping' />

      {loading}
      {dropDownArrow}
    </Container>
  );
};
