import { Container, Heading } from '@/shared/components/ui';
import { useGetCart } from '@/shared/hooks/data';
import { OrderSummaryLoading } from '../molecules/OrderSummaryLoading';
import { OrderSummaryError } from '../molecules/OrderSummaryError';
import { OrderSummaryItem } from '../molecules/OrderSummaryItem';
import { OrderSummaryEmpty } from '../molecules/OrderSummaryEmpty';

export const OrderSummary = () => {
  const cart = useGetCart();

  const loading = cart.isLoading && <OrderSummaryLoading />;
  const error = cart.error && <OrderSummaryError />;
  const emptyCart = cart.data && !cart.data.items.length && (
    <OrderSummaryEmpty />
  );
  const data =
    cart.data &&
    cart.data.items.length !== 0 &&
    cart.data.items.map((cartItem) => <OrderSummaryItem cartItem={cartItem} />);

  return (
    <Container as='div' flex='col'>
      <Heading as='h5' content='Order Summary' className='mb-3' />

      {loading}
      {error}
      {emptyCart}
      {data}
    </Container>
  );
};
