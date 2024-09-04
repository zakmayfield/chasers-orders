'use client';
import { Container, ContentTemplate } from '@/shared/components/ui';
import { OrdersList } from '../organisms/OrdersList';

export const OrdersTemplate = () => {
  return (
    <ContentTemplate title='Orders' headingClassname='mb-3'>
      <Container as='div' flex='col' paddingX='lg'>
        <OrdersList />
      </Container>
    </ContentTemplate>
  );
};
