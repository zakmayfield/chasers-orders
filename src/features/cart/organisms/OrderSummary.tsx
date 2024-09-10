import { OrderSummaryLoading } from '../molecules/order_summary/OrderSummaryLoading';
import { OrderSummaryItem } from '../molecules/order_summary/OrderSummaryItem';
import { OrderSummaryEmpty } from '../molecules/order_summary/OrderSummaryEmpty';
import { ContentWrapper, Layout } from '@/shared/components/containers';
import { useGetCart } from '@/shared/hooks/data/cart/useCart';
import { Error } from '../atoms/Error';

export const OrderSummary = () => {
  const { cart, isLoading, error } = useGetCart();

  const loading = isLoading && <OrderSummaryLoading />;
  const errorData = error && (
    <Error message='There was an issue getting your order summary' />
  );
  const emptyCart = cart && !cart.items.length && <OrderSummaryEmpty />;
  const data = cart && cart.items.length !== 0 && (
    <ContentWrapper flex='col'>
      {cart.items.map((cartItem) => (
        <OrderSummaryItem
          key={cartItem.product_variant_id}
          cartItem={cartItem}
        />
      ))}
    </ContentWrapper>
  );

  return (
    <Layout
      heading='h3'
      title='Order Summary'
      contentPadding='lg'
      contentRounded='lg'
      contentClassname='bg-slate-50'
    >
      {loading}
      {errorData}
      {emptyCart}
      {data}
    </Layout>
  );
};
