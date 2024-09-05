import { Container, ContentTemplate } from '@/shared/components/ui';
import { CartItemsLoading } from '../molecules/CartItemsLoading';
import { CartItemsError } from '../molecules/CartItemsError';
import { CartItemsEmpty } from '../molecules/CartItemsEmpty';
import { CartItem } from '../molecules/CartItem';
import { useGetCart } from '@/shared/hooks/data/cart/useCart';

export const CartItems = () => {
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
    <ContentTemplate title='Cart Items' headingAs='h3'>
      <Container as='div' rounded='sm' padding='lg' className='bg-slate-100'>
        {loading}
        {errorData}
        {emptyCart}
        {data}
      </Container>
    </ContentTemplate>
  );
};
