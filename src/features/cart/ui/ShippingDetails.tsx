'use client';
import { FaChevronDown } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { CiWarning } from 'react-icons/ci';
import { getShipping } from '@/services/queries/cart.getShipping';
import { GetShippingPayload } from '@/app/api/user/company/shipping/route';
import { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';

const ShippingDetails = () => {
  const { data, isLoading, error } = useQuery<
    GetShippingPayload | undefined,
    Error
  >({
    queryKey: ['shipping-address'],
    queryFn: getShipping,
  });

  const [expanded, setExpanded] = useState(false);

  if (error) {
    return (
      <div className='mt-6'>
        <ContainerHeader noArrow={true} setExpanded={setExpanded} />

        <p className=' flex items-center gap-3 font-extralight'>
          Could not locate shipping information{' '}
          <span className='text-yellow-600 text-xl'>
            <CiWarning />
          </span>
        </p>
      </div>
    );
  }

  const shippingAddress = data?.shippingAddress;
  const companyName = data?.companyName;

  return (
    <div className='col-span-3 mt-3 font-light'>
      {/* Details Container Header */}
      <ContainerHeader expanded={expanded} setExpanded={setExpanded} />

      {/* Dropdown */}
      {expanded && (
        <div className='border-t shadow'>
          {/* Details Container Body */}
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
              <div className='mb-3 flex items-center justify-between underline'>
                <h5 className='font-light'>Delivery Instructions:</h5>
                <Link href='/dashboard/settings/company/edit'>edit</Link>
              </div>
              <p className='px-3'>{shippingAddress?.deliveryInstructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function ContainerHeader({
  expanded,
  noArrow,
  setExpanded,
}: {
  expanded?: boolean;
  noArrow?: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}) {
  function handleExpand() {
    setExpanded(!expanded);
  }
  return (
    <div className='flex items-center justify-between mb-6'>
      <h4>Shipping information</h4>

      {!noArrow && (
        <button
          className={`text-slate-600 px-6 py-2 transform  ${expanded && 'rotate-180'}`}
          onClick={handleExpand}
        >
          <FaChevronDown />
        </button>
      )}
    </div>
  );
}

export default ShippingDetails;