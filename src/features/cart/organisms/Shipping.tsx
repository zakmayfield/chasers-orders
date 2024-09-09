import { useState } from 'react';
import { ShippingHeading } from '../molecules/shipping/ShippingHeading';
import { ShippingError } from '../molecules/shipping/ShippingError';
import { ShippingData } from '../molecules/shipping/ShippingData';
import { ShippingDeliveryInstructions } from '../molecules/shipping/ShippingDeliveryInstructions';
import { Layout } from '@/shared/components/containers';
import { useGetCompany } from '@/shared/hooks/data/user/useUser';

export const Shipping = () => {
  const { company, error, isLoading } = useGetCompany();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const errorData = error && <ShippingError />;

  const shippingData = company && company.shipping && isOpen && (
    <ShippingData company={company} />
  );

  const deliveryInstructions = company && company.shipping && isOpen && (
    <ShippingDeliveryInstructions
      deliveryInstructions={company.shipping.deliveryInstructions || ''}
    />
  );

  return (
    <Layout
      heading='h3'
      title='Shipping'
      contentPadding='lg'
      contentRounded='lg'
      contentClassname='bg-slate-50'
    >
      shipping
    </Layout>
  );
};

// <Container as='div'>
//   <ShippingHeading toggleOpen={toggleOpen} isOpen={isOpen} />

//   {error}

//   <Container as='div' flex='col'>
//     {shippingData}
//     {deliveryInstructions}
//   </Container>
// </Container>
