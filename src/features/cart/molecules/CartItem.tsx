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
      className='gap-3 bg-slate-50 max-w-sm lg:max-w-lg'
    >
      <Btn
        Icon={TrashDuotone}
        fontSize='lg'
        handleClick={() =>
          mutate({ product_variant_id: cartItem.product_variant_id })
        }
        isDisabled={isLoading}
      />
    </Container>
  );
};
