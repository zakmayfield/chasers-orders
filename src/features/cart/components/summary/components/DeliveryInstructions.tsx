import Link from 'next/link';
import { FC } from 'react';

interface DeliveryInstructionsProps {
  content: string | null | undefined;
}

export const DeliveryInstructions: FC<DeliveryInstructionsProps> = ({
  content: deliveryInstructions,
}) => {
  return (
    <div className='mt-3'>
      <div className='mb-3 flex items-center justify-between'>
        <h5 className='font-light text-lg'>Delivery Instructions:</h5>
        <Link href='/dashboard' className=' border rounded hover:ring-2  px-2'>
          edit
        </Link>
      </div>
      <p className='border-l border-b rounded-bl p-3 bg-white'>
        {deliveryInstructions}
      </p>
    </div>
  );
};
