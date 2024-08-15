import { DeliveryInstructions } from '@/features/cart/cart-summary/shipping/components/instructions';
import { ShippingData } from '@/types/user';

export const ShippingBody = ({ data }: { data: ShippingData | undefined }) => {
  return (
    <div className='w-full p-4 font-extralight flex flex-col gap-3'>
      <Address data={data} />
      <DeliveryInstructions
        content={data?.shippingAddress.deliveryInstructions}
      />
    </div>
  );
};

function Address({ data }: { data: ShippingData | undefined }) {
  return (
    <div>
      <p className='text-lg font-light mb-3'>{data?.companyName}</p>

      <div className=' bg-light-primary p-3 rounded-lg flex flex-col gap-2'>
        <p className=''>{data?.shippingAddress.streetAddress}</p>
        <p>
          <span>{data?.shippingAddress.city}</span>,{' '}
          <span>{data?.shippingAddress.state}</span>
        </p>
        <p>{data?.shippingAddress.postalCode}, Canada</p>
      </div>
    </div>
  );
}
