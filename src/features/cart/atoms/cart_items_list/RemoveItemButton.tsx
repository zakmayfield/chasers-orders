import { Btn } from '@/shared/components/ui';
import { useDeleteCartItem } from '@/shared/hooks/data/cart/useCart';
import { TrashDuotone } from '@/shared/utils/ui';

type TRemoveItemButtonProps = { product_variant_id: string };

export const RemoveItemButton = ({
  product_variant_id,
}: TRemoveItemButtonProps) => {
  const { mutate, isLoading } = useDeleteCartItem();
  const clickHandler = () => mutate({ product_variant_id });

  return (
    <Btn
      Icon={TrashDuotone}
      fontSize='lg'
      handleClick={clickHandler}
      isDisabled={isLoading}
    />
  );
};
