import { FC } from 'react';
import Link from 'next/link';
import { GetShippingPayload } from '@/app/api/user/company/shipping/route';

interface ContainerBodyProps {
  data: GetShippingPayload | undefined;
}

export const ContainerBody: FC<ContainerBodyProps> = ({ data }) => {
  const shippingAddress = data?.shippingAddress;
  const companyName = data?.companyName;
  return (
    <div className='w-full p-4 font-extralight flex flex-col gap-3'>
      <p className='text-lg font-light'>{companyName}</p>
      <div className='ml-3 flex flex-col gap-2'>
        <p className=''>{shippingAddress?.streetAddress}</p>
        <p>
          <span>{shippingAddress?.city}</span>,{' '}
          <span>{shippingAddress?.state}</span>
        </p>
        <p>{shippingAddress?.postalCode}, Canada</p>
      </div>

      {/* Special Instructions */}
      <div className='mt-3'>
        <div className='mb-3 flex items-center justify-between'>
          <h5 className='font-light text-lg'>Delivery Instructions:</h5>
          <Link
            href='/dashboard'
            className=' border rounded hover:ring-2  px-2'
          >
            edit
          </Link>
        </div>
        <p className='px-3'>{shippingAddress?.deliveryInstructions}</p>
      </div>
    </div>
  );
};
