import { useState } from 'react';
import { Btn, Container } from '@/shared/components/ui';
import { useAddToCart } from '@/shared/hooks/data/cart/useCart';
import { useDeleteFavorite } from '@/shared/hooks/data/favorites/useFavorites';
import {
  HeartBreakDuotone,
  HeartDuotone,
  ShoppingCartDuotone,
} from '@/shared/utils/ui';
import { TFavoriteWithProductAndCategory } from '@/shared/types/Favorite';

export const FavoritesItem = ({
  favorite,
}: {
  favorite: TFavoriteWithProductAndCategory;
}) => {
  const { mutate: addToCart } = useAddToCart();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const [isHover, setIsHover] = useState(false);

  return (
    <Container
      as='div'
      flex='row'
      className='border-b last-of-type:border-none'
      padding='sm'
    >
      <Container as='div' flex='row' width='sm' gap='lg'>
        <Btn
          Icon={isHover ? HeartBreakDuotone : HeartDuotone}
          fontSize='lg'
          textColor='text-green-500'
          handleClick={() =>
            deleteFavorite({ product_id: favorite.product_id })
          }
          mouseActions={{
            onMouseEnter: () => setIsHover(true),
            onMouseLeave: () => setIsHover(false),
          }}
        />
        <Container as='div'>
          <Container as='p'>{favorite.product.name}</Container>
          <Container as='p' className='italic text-gray-600 text-sm'>
            {favorite.product.category?.name}
          </Container>
        </Container>
      </Container>

      <Btn
        Icon={ShoppingCartDuotone}
        fontSize='lg'
        handleClick={() => addToCart({ product_id: favorite.product_id })}
      />
    </Container>
  );
};
