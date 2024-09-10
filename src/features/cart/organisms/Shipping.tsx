import { useState } from 'react';
import { ShippingHeading } from '../molecules/shipping/ShippingHeading';
import { ShippingData } from '../molecules/shipping/ShippingData';
import { ShippingDeliveryInstructions } from '../molecules/shipping/ShippingDeliveryInstructions';
import { ContentWrapper, Layout } from '@/shared/components/containers';
import { useGetCompany } from '@/shared/hooks/data/user/useUser';
import { Error } from '../atoms/Error';

export const Shipping = () => {
  const { company, error } = useGetCompany();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const errorData = error && (
    <Error message='Could not get your shipping address' />
  );

  const shippingData = company && company.shipping && isOpen && (
    <ShippingData company={company} />
  );

  const deliveryInstructions = company && company.shipping && isOpen && (
    <ShippingDeliveryInstructions company={company} />
  );

  return (
    <Layout
      heading='h3'
      title='Shipping'
      contentPadding='lg'
      contentRounded='lg'
      contentFlex='col'
      contentClassname='bg-slate-50'
    >
      <ShippingHeading isOpen={isOpen} toggleOpen={toggleOpen} />

      {errorData}

      <ContentWrapper flex='col'>
        {shippingData}
        {deliveryInstructions}
      </ContentWrapper>
    </Layout>
  );
};
