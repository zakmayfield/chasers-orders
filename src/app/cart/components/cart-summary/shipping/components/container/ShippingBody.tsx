import { DeliveryInstructions } from '@/app/cart/components/cart-summary/shipping/components/instructions';
import { ShippingAddress } from './ShippingAddress';

export const ShippingBody = () => {
  return (
    <div className='w-full p-4 font-extralight flex flex-col gap-3'>
      <ShippingAddress />
      <DeliveryInstructions />
    </div>
  );
};
