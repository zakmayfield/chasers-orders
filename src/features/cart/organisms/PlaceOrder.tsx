import { Btn, Container } from '@/shared/components/ui';
import { useGetCart } from '@/shared/hooks/data';
import { useCreateOrder } from '@/shared/hooks/mutations';

export const PlaceOrder = () => {
  const cart = useGetCart();
  const { order, createOrderLoading } = useCreateOrder({ cartData: cart.data });
  return (
    <Container as='div'>
      <Btn
        text='Place Order'
        bgColor='green'
        width='full'
        height='lg'
        isDisabled={
          cart.isLoading || cart.data?.items.length === 0 || createOrderLoading
        }
        isLoading={createOrderLoading}
        handleClick={order}
      />
    </Container>
  );
};
