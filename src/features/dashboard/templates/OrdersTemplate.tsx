'use client';
import { Container, ContentTemplate } from '@/shared/components/ui';
import { OrdersList } from '../organisms/OrdersList';

export const OrdersTemplate = () => {
  return (
    <ContentTemplate title='Orders' headingClassname='mb-3'>
      <Container as='div' flex='col' className='md:px-6'>
        {/* TODO: add quick order button to orders item */}
        <OrdersList />
      </Container>
    </ContentTemplate>
  );
};
