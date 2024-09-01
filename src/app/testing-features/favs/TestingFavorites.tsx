'use client';

import { Btn, Container, Heading, SpinLoader } from '@/shared/components/ui';
import {
  useGetFavorites,
  useToggleFavorite,
} from '@/shared/hooks/data/favorites/useFavorites';
import { useGetProducts } from '@/shared/hooks/data/products/useProducts';
import { HeartDuotoneIcon, HeartOutlineIcon } from '@/shared/utils/ui';

export const TestingFavorites = () => {
  const { products, isLoading } = useGetProducts({ take: 5 });
  const { favorites } = useGetFavorites();
  const { mutate } = useToggleFavorite();

  return (
    <Container as='div' flex='col' width='full'>
      <Heading as='h2' content='Favorites' />
      {isLoading ? (
        <Container as='div' flex='row' flexCenter={true}>
          <SpinLoader />
        </Container>
      ) : (
        products.withoutVariants.map((product) => (
          <Container
            as='div'
            key={product.product_id}
            flex='row'
            className='justify-between'
          >
            <Container as='p'>{product.name}</Container>
            {favorites.product_ids_array.includes(product.product_id) ? (
              <Btn
                Icon={HeartDuotoneIcon}
                handleClick={() =>
                  mutate({
                    action: 'remove',
                    product_id: product.product_id,
                  })
                }
              />
            ) : (
              <Btn
                Icon={HeartOutlineIcon}
                handleClick={() =>
                  mutate({ action: 'add', product_id: product.product_id })
                }
              />
            )}
          </Container>
        ))
      )}
    </Container>
  );
};
