import { FC } from 'react';
import { GetShippingPayload } from '@/app/api/user/company/shipping/route';
import { DeliveryInstructions } from './DeliveryInstructions';
import { ShippingAddress } from '@prisma/client';

interface ContainerBodyProps {
  data: GetShippingPayload | undefined;
}

export const ContainerBody: FC<ContainerBodyProps> = ({ data }) => {
  const shippingAddress = data?.shippingAddress;
  const companyName = data?.companyName;
  return (
    <div className='w-full p-4 font-extralight flex flex-col gap-3'>
      <p className='text-lg font-light'>{companyName}</p>

      <Address shippingAddress={shippingAddress} />

      {/* Special Instructions */}
      <DeliveryInstructions content={shippingAddress?.deliveryInstructions} />
    </div>
  );
};

function Address({
  shippingAddress,
}: {
  shippingAddress: ShippingAddress | null | undefined;
}) {
  return (
    <div className='ml-3 flex flex-col gap-2'>
      <p className=''>{shippingAddress?.streetAddress}</p>
      <p>
        <span>{shippingAddress?.city}</span>,{' '}
        <span>{shippingAddress?.state}</span>
      </p>
      <p>{shippingAddress?.postalCode}, Canada</p>
    </div>
  );
}
