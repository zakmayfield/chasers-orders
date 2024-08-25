import { Container, Heading, SpinLoader } from '@/shared/components/ui';
import { CartCount } from '../atoms/CartCount';
import { useGetCart } from '@/shared/hooks/data';

export const CartHeading = () => {
  const cart = useGetCart();

  const loading = cart.isLoading && <SpinLoader />;
  const count = cart.data && <CartCount count={cart.data.items.length} />;

  return (
    <Container as='div' flex='row'>
      <Heading as='h1' content='Cart' />

      {loading}
      {count}
    </Container>
  );
};
