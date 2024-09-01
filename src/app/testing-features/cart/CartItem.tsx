import { Btn, Container, PulseLoader } from '@/shared/components/ui';
import { useDeleteCartItem } from '@/shared/hooks/data/cart/useCart';
import { useGetProduct } from '@/shared/hooks/data/products/useProducts';
import { TCartItemWithProductVariant } from '@/shared/types/Cart';
import { XIcon } from '@/shared/utils/ui';

export const CartItem = ({
  cartItem,
}: {
  cartItem: TCartItemWithProductVariant;
}) => {
  const { data: product, isLoading } = useGetProduct({
    product_id: cartItem.product_variant.product_id,
  });
  const { mutate: deleteCartItem } = useDeleteCartItem();

  return (
    <Container as='div'>
      {isLoading ? (
        <PulseLoader width='full' />
      ) : (
        <Container as='div' flex='row' className='justify-between'>
          <Container as='p'>{product.withoutVariants?.name}</Container>
          <Btn
            Icon={XIcon}
            handleClick={() =>
              deleteCartItem({
                product_variant_id: cartItem.product_variant_id,
              })
            }
          />
        </Container>
      )}
    </Container>
  );
};
