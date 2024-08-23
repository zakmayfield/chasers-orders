import { Container, Heading, SpinLoader } from '@/shared/components/ui';
import { CartCount } from '../atoms/CartCount';
import { useGetCart } from '@/shared/hooks/data';

export const CartHeading = () => {
  const cart = useGetCart();
  return (
    <Container as='div' flex='row'>
      <Heading as='h1' content='Cart' />

      {cart.isLoading ? (
        <SpinLoader />
      ) : (
        <CartCount count={cart.data?.items.length} />
      )}
    </Container>
  );
};
