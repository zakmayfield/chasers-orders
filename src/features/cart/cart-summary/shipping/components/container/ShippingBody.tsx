import { FC } from 'react';
import { DeliveryInstructions } from '@/features/cart/cart-summary/shipping/components/instructions';
import { ShippingData } from '@/types/user';

interface ShippingBodyProps {
  data: ShippingData | undefined;
}

export const ShippingBody: FC<ShippingBodyProps> = ({ data }) => {
  return (
    <div className='w-full p-4 font-extralight flex flex-col gap-3'>
      <Address shippingData={data} />
      <DeliveryInstructions
        content={data?.shippingAddress?.deliveryInstructions}
      />
    </div>
  );
};

function Address({ shippingData }: { shippingData: ShippingData | undefined }) {
  return (
    <div>
      <p className='text-lg font-light mb-3'>{shippingData?.companyName}</p>

      <div className=' bg-light-primary p-3 rounded-lg flex flex-col gap-2'>
        <p className=''>{shippingData?.shippingAddress?.streetAddress}</p>
        <p>
          <span>{shippingData?.shippingAddress?.city}</span>,{' '}
          <span>{shippingData?.shippingAddress?.state}</span>
        </p>
        <p>{shippingData?.shippingAddress?.postalCode}, Canada</p>
      </div>
    </div>
  );
}
