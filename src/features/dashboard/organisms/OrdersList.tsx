import { Container, PulseLoader } from '@/shared/components/ui';
import { useGetOrders } from '@/shared/hooks/data/orders/useOrders';
import { Error } from '../molecules/Error';
import { EmptyData } from '../molecules/EmptyData';
import { OrdersItem } from '../molecules/OrdersItem';
import { useAccordion } from '@/shared/hooks/utils';

export const OrdersList = () => {
  const { data: orders, isLoading, error } = useGetOrders();
  const accordionCtx = useAccordion();

  const loading = isLoading && <PulseLoader rows='multi' width='full' />;
  const errorData = error && <Error message={error.message} />;
  const emptyOrders = !error && !orders?.length && !isLoading && (
    <EmptyData text='No orders' />
  );
  const data = orders && !error && orders.length > 0 && (
    <Container as='div' flex='col'>
      {orders.map((order) => (
        <OrdersItem
          key={order.order_id}
          order={order}
          accordionCtx={{ ...accordionCtx }}
        />
      ))}
    </Container>
  );

  return (
    <Container as='div'>
      {loading}
      {errorData}
      {emptyOrders}
      {data}
    </Container>
  );
};
