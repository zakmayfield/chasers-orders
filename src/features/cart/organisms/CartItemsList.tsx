import { CartItemsLoading } from '@/features/cart/molecules/cart_items_list/CartItemsLoading';
import { CartItemsEmpty } from '@/features/cart/molecules/cart_items_list/CartItemsEmpty';
import { CartItem } from '@/features/cart/molecules/cart_items_list/CartItem';
import { useGetCart } from '@/shared/hooks/data/cart/useCart';
import { ContentWrapper, Layout } from '@/shared/components/containers';
import { Error } from '@/features/cart/atoms/Error';

export const CartItemsList = () => {
  const { cart, isLoading, error } = useGetCart();

  const loading = isLoading && <CartItemsLoading />;
  const errorData = error && (
    <Error message='There was an issue getting your cart' />
  );
  const emptyCart = cart && !cart.items.length && <CartItemsEmpty />;
  const data = cart && cart.items.length !== 0 && (
    <ContentWrapper flex='col'>
      {cart.items.map((item) => (
        <CartItem key={item.product_variant_id} cartItem={item} />
      ))}
    </ContentWrapper>
  );

  return (
    <Layout
      heading='h3'
      title='Cart Items'
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
