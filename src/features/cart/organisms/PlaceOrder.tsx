import { ContentWrapper } from '@/shared/components/containers';
import { Btn } from '@/shared/components/ui';
import { useGetCart } from '@/shared/hooks/data/cart/useCart';
import { useCreateOrder } from '@/shared/hooks/data/orders/useOrders';

export const PlaceOrder = () => {
  const { cart } = useGetCart();
  const { mutate: createOrder } = useCreateOrder();

  return (
    <ContentWrapper>
      <Btn text='Place Order' bgColor='green' width='full' />
    </ContentWrapper>
  );
  // <Container as='div'>
  //   <Btn
  //     text='Place Order'
  //     bgColor='green'
  //     width='full'
  //     height='lg'
  //     isDisabled={
  //       cart.isLoading || cart.data?.items.length === 0 || createOrderLoading
  //     }
  //     isLoading={createOrderLoading}
  //     handleClick={order}
  //   />
  // </Container>
};
