'use client';
import {
  Btn,
  Container,
  Heading,
  PulseLoader,
  SpinLoader,
} from '@/shared/components/ui';
import {
  useAddToCart,
  useDeleteCartItem,
  useEmptyCart,
  useGetCart,
} from '@/shared/hooks/data/cart/useCart';
import {
  useGetProduct,
  useGetProducts,
} from '@/shared/hooks/data/products/useProducts';
import { CartIcon, EmptyCartIcon, XIcon } from '@/shared/utils/ui';
import { TCartItemWithProductVariant } from '@/shared/types/Cart';

export const TestingCart = () => {
  const { products, isLoading } = useGetProducts({
    take: 3,
    hasVariants: true,
  });
  const { cart, isLoading: loadingCart } = useGetCart();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: emptyCart } = useEmptyCart();

  const productsData = products.withVariants && (
    <Container as='div' flex='col'>
      <Heading as='h5' content='Products' />
      {isLoading ? (
        <PulseLoader rows='multi' width='full' />
      ) : (
        products.withVariants.map((product) => (
          <Container
            key={product.product_id}
            as='div'
            flex='row'
            className='justify-between'
          >
            <Container as='p'>{product.name}</Container>

            {/* TODO: update cache data when adding item to cart */}
            <Btn
              Icon={CartIcon}
              handleClick={() =>
                addToCart({
                  product_variant_id: product.variants[0].product_variant_id,
                })
              }
            />
          </Container>
        ))
      )}
    </Container>
  );

  const cartData = (
    <Container as='div' flex='col'>
      <Container as='div' flex='row' className='justify-between'>
        <Heading as='h5' content='Cart' />
        {!loadingCart && (
          <Btn Icon={EmptyCartIcon} handleClick={() => emptyCart({})} />
        )}
      </Container>

      {loadingCart ? (
        <Container
          as='div'
          width='full'
          flex='row'
          flexCenter={true}
          padding='md'
        >
          <SpinLoader />
        </Container>
      ) : (
        cart?.items.map((cartItem) => (
          <CartItem key={cartItem.product_variant_id} cartItem={cartItem} />
        ))
      )}
    </Container>
  );

  return (
    <Container as='div' flex='col' width='full'>
      <Heading as='h2' content='Cart' />

      <Container as='div' flex='col' className='gap-12'>
        {productsData}
        {cartData}
      </Container>
    </Container>
  );
};

const CartItem = ({ cartItem }: { cartItem: TCartItemWithProductVariant }) => {
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
