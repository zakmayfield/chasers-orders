import { Btn } from '@/shared/components/ui';
import { useGetCart } from '@/shared/hooks/data/cart/useCart';
import { useCreateOrder } from '@/shared/hooks/data/orders/useOrders';

type TPlaceOrderButtonProps = {};

export const PlaceOrderButton = (props: TPlaceOrderButtonProps) => {
  const { cart, isLoading: loadingCart } = useGetCart();
  const { mutate, isLoading: loadingCreateOrder } = useCreateOrder();

  const loading = loadingCart || loadingCreateOrder;

  const line_items = cart?.items.map((item) => {
    return {
      product_variant_id: item.product_variant_id,
      quantity: item.quantity,
    };
  });

  const order = () => mutate({ line_items: line_items! });

  return (
    <Btn
      text='Place Order'
      bgColor='green'
      width='full'
      isDisabled={loading}
      isLoading={loadingCreateOrder}
      handleClick={order}
    />
  );
};
