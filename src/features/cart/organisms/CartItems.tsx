import { Container } from '@/shared/components/ui';
import { useGetCart } from '@/shared/hooks/data';
import { CartItemsLoading } from '../molecules/CartItemsLoading';
import { CartItemsError } from '../molecules/CartItemsError';
import { CartItemsEmpty } from '../molecules/CartItemsEmpty';
import { CartItem } from '../molecules/CartItem';
import { CartHeading } from '../molecules/CartHeading';

export const CartItems = () => {
  const cart = useGetCart();

  const loading = cart.isLoading && <CartItemsLoading />;
  const error = cart.error && <CartItemsError />;
  const emptyCart = cart.data && !cart.data.items.length && <CartItemsEmpty />;
  const data =
    cart.data &&
    cart.data.items.length !== 0 &&
    cart.data.items.map((item) => (
      <CartItem key={item.unitId} cartItem={item} />
    ));

  return (
    <Container as='div' flex='col'>
      <CartHeading />

      {loading}
      {error}
      {emptyCart}
      {data}
    </Container>
  );
};
