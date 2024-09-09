import { ContentWrapper } from '@/shared/components/containers';
import { useGetCart } from '@/shared/hooks/data/cart/useCart';
import { useCreateOrder } from '@/shared/hooks/data/orders/useOrders';
import { PlaceOrderButton } from '@/features/cart/atoms/place_order/PlaceOrderButton';

export const PlaceOrder = () => {
  const { cart } = useGetCart();
  const { mutate: createOrder } = useCreateOrder();

  return (
    <ContentWrapper>
      <PlaceOrderButton />
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
