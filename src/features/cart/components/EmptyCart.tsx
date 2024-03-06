import Link from 'next/link';

export const EmptyCart = () => {
  return (
    <div>
      <Link href='/products' className='underline'>
        Visit the shop to add items to your cart.
      </Link>
    </div>
  );
};
