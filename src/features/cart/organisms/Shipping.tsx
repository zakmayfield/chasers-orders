import { Container } from '@/shared/components/ui';
import { useGetShippingAddress } from '@/shared/hooks/data';
import { ShippingHeading } from '../molecules/ShippingHeading';
import { useState } from 'react';
import { ShippingError } from '../molecules/ShippingError';
import { ShippingData } from '../molecules/ShippingData';
import { ShippingDeliveryInstructions } from '../molecules/ShippingDeliveryInstructions';

export const Shipping = () => {
  const shipping = useGetShippingAddress();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const error = shipping.error && <ShippingError />;

  const shippingData = shipping.data &&
    shipping.data.shippingAddress &&
    isOpen && <ShippingData shippingData={shipping.data} />;

  const deliveryInstructions = shipping.data &&
    shipping.data.shippingAddress &&
    isOpen && (
      <ShippingDeliveryInstructions
        deliveryInstructions={
          shipping.data.shippingAddress.deliveryInstructions || ''
        }
      />
    );

  return (
    <Container as='div'>
      <ShippingHeading toggleOpen={toggleOpen} isOpen={isOpen} />

      {error}

      <Container as='div' flex='col'>
        {shippingData}
        {deliveryInstructions}
      </Container>
    </Container>
  );
};
