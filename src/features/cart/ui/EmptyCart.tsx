import Link from 'next/link';

const EmptyCart = () => {
  return (
    <div>
      <Link href='/products' className='underline'>
        Visit the shop to add items to your cart.
      </Link>
    </div>
  );
};

export default EmptyCart;
