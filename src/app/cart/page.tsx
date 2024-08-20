import { Summary } from './components/cart-summary/Summary';
import { CartItems } from './components/items/CartItems';

export default async function Page() {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <CartItems />
      <Summary />
    </div>
  );
}
