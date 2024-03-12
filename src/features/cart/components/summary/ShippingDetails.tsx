'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getShipping } from '@/features/cart/services.cart';
import { GetShippingPayload } from '@/app/api/user/company/shipping/route';
import { ContainerBody, ContainerError, ContainerHeader } from './components';

export const ShippingDetails = () => {
  const { data, isFetching, error } = useQuery<
    GetShippingPayload | undefined,
    Error
  >({
    queryKey: ['shipping-address'],
    queryFn: getShipping,
    staleTime: 60 * 1000 * 60,
  });

  const [expanded, setExpanded] = useState(false);

  if (error) {
    return <ContainerError setExpanded={setExpanded} />;
  }

  return (
    <div className='col-span-3 mt-3 font-light'>
      <ContainerHeader
        expanded={expanded}
        isFetching={isFetching}
        setExpanded={setExpanded}
      />

      {/* Dropdown */}
      {expanded && (
        <div className='bg-light-primary rounded-lg'>
          <ContainerBody data={data} />
        </div>
      )}
    </div>
  );
};
