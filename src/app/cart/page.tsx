import { CartTemplate } from '@/features/cart/templates/CartTemplate';

export default async function Page() {
  return (
    //   <div className='grid grid-cols-12 gap-4'>
    //     <CartItems />
    //     <Summary />
    //   </div>
    <CartTemplate />
  );
}
