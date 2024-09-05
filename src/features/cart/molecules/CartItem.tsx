import { Btn, Container } from '@/shared/components/ui';
import { SelectSize } from '../atoms/SelectSize';
import { SelectQuantity } from '../atoms/SelectQuantity';
import { useDeleteCartItem } from '@/shared/hooks/data/cart/useCart';
import { TrashDuotone } from '@/shared/utils/ui';
import { TCartItem } from '@/shared/types/Cart';

export const CartItem = ({ cartItem }: { cartItem: TCartItem }) => {
  const { mutate, isLoading } = useDeleteCartItem();

  return (
    <Container
      as='div'
      padding='md'
      flex='row'
      rounded='sm'
      className='gap-3 bg-slate-50'
    >
      <Btn
        Icon={TrashDuotone}
        fontSize='lg'
        handleClick={() =>
          mutate({ product_variant_id: cartItem.product_variant_id })
        }
        isDisabled={isLoading}
      />

      <Container as='div' flex='row' className=''>
        <Container as='div' flex='col' className='gap-1'>
          <Container as='p'>
            {cartItem.product_variant?.product?.name}
          </Container>
          <Container as='p' className='italic text-gray-600'>
            {cartItem.product_variant?.product?.category?.name}
          </Container>
        </Container>

        {/* <Container as='div' flex='row' className='items-center gap-6'>
          <SelectSize
            cartId={cartItem.cart_id}
            unitId={cartItem.product_variant_id}
            currentSize={cartItem.product_variant!.size}
          />
          <SelectQuantity
            cartId={cartItem.cart_id}
            unitId={cartItem.product_variant_id}
            quantity={cartItem.quantity}
          />
        </Container> */}
      </Container>
    </Container>
  );
};
