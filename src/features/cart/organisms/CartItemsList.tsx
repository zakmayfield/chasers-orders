import { CartItemsLoading } from '../molecules/cart_items_list/CartItemsLoading';
import { CartItemsError } from '../molecules/cart_items_list/CartItemsError';
import { CartItemsEmpty } from '../molecules/cart_items_list/CartItemsEmpty';
import { CartItem } from '../molecules/cart_items_list/CartItem';
import { useGetCart } from '@/shared/hooks/data/cart/useCart';
import { Layout } from '@/shared/components/containers';

export const CartItemsList = () => {
  const { cart, isLoading, error } = useGetCart();

  const loading = isLoading && <CartItemsLoading />;
  const errorData = error && <CartItemsError />;
  const emptyCart = cart && !cart.items.length && <CartItemsEmpty />;
  const data =
    cart &&
    cart.items.length !== 0 &&
    cart.items.map((item) => (
      <CartItem key={item.product_variant_id} cartItem={item} />
    ));

  return (
    <Layout
      heading='h3'
      title='Cart Items'
      contentPadding='lg'
      contentRounded='lg'
      contentClassname='bg-slate-50'
    >
      items
    </Layout>
  );
};

// <ContentTemplate title='Cart Items' headingAs='h3'>
//   <Container as='div' rounded='sm' padding='lg' className='bg-slate-100'>
//     {loading}
//     {errorData}
//     {emptyCart}
//     {data}
//   </Container>
// </ContentTemplate>
