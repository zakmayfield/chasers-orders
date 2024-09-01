'use client';
import { Btn, Container, Heading, SpinLoader } from '@/shared/components/ui';
import {
  useAddToCart,
  useDeleteCartItem,
  useEmptyCart,
  useGetCart,
} from '@/shared/hooks/data/cart/useCart';
import { useGetProducts } from '@/shared/hooks/data/products/useProducts';
import { CartIcon, EmptyCartIcon, XIcon } from '@/shared/utils/ui';

export const TestingCart = () => {
  const { products, isLoading: loadingProducts } = useGetProducts({
    take: 3,
    hasVariants: true,
  });
  const { cart } = useGetCart();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: deleteCartItem } = useDeleteCartItem();
  const { mutate: emptyCart } = useEmptyCart();

  const productsData = products.withVariants && !loadingProducts && (
    <Container as='div' flex='col'>
      <Heading as='h5' content='Products' />

      {products.withVariants.map((product) => (
        <Container
          key={product.product_id}
          as='div'
          flex='row'
          className='justify-between'
        >
          <Container as='p'>{product.name}</Container>

          <Btn
            Icon={CartIcon}
            handleClick={() =>
              addToCart({
                product_variant_id: product.variants[0].product_variant_id,
              })
            }
          />
        </Container>
      ))}
    </Container>
  );

  const cartData = cart && (
    <Container as='div' flex='col'>
      <Container as='div' flex='row' className='justify-between'>
        <Heading as='h5' content='Cart' />
        {cart.items.length !== 0 && (
          <Btn Icon={EmptyCartIcon} handleClick={() => emptyCart({})} />
        )}
      </Container>

      {cart.items.map((cartItem) => (
        <Container as='div' flex='row' className='justify-between'>
          <Container as='p'>{cartItem.product_variant_id}</Container>

          <Btn
            Icon={XIcon}
            handleClick={() =>
              deleteCartItem({
                product_variant_id: cartItem.product_variant_id,
              })
            }
          />
        </Container>
      ))}
    </Container>
  );

  return (
    <Container as='div' flex='col' width='full'>
      <Heading as='h2' content='Cart' />

      {loadingProducts ? (
        <Container as='div' flex='row' flexCenter={true}>
          <SpinLoader />
        </Container>
      ) : (
        <Container as='div' flex='col' className='gap-12'>
          {productsData}
          {cartData}
        </Container>
      )}
    </Container>
  );
};
