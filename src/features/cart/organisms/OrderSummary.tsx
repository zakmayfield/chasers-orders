import { OrderSummaryLoading } from '../molecules/order_summary/OrderSummaryLoading';
import { OrderSummaryError } from '../molecules/order_summary/OrderSummaryError';
import { OrderSummaryItem } from '../molecules/order_summary/OrderSummaryItem';
import { OrderSummaryEmpty } from '../molecules/order_summary/OrderSummaryEmpty';
import { Layout } from '@/shared/components/containers';
import { useGetCart } from '@/shared/hooks/data/cart/useCart';

export const OrderSummary = () => {
  const { cart, isLoading, error } = useGetCart();

  const loading = isLoading && <OrderSummaryLoading />;
  const errorData = error && <OrderSummaryError />;
  const emptyCart = cart && !cart.items.length && <OrderSummaryEmpty />;
  const data =
    cart &&
    cart.items.length !== 0 &&
    cart.items.map((cartItem) => (
      <OrderSummaryItem key={cartItem.product_variant_id} cartItem={cartItem} />
    ));

  return (
    <Layout
      heading='h3'
      title='Order Summary'
      contentPadding='lg'
      contentRounded='lg'
      contentClassname='bg-slate-50'
    >
      summary
    </Layout>
  );
};
// <Container as='div' flex='col'>
//   <Heading as='h5' content='Order Summary' className='mb-3' />

//   {loading}
//   {error}
//   {emptyCart}
//   {data}
// </Container>
