'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ContainerBody, ContainerError, ContainerHeader } from './components';
import { ShippingData } from '@/types/user';
import { getShippingAddress } from '@/services/queries/getShippingAddress';

export const ShippingDetails = () => {
  const { data, isFetching, error } = useQuery<ShippingData | undefined, Error>(
    {
      queryKey: ['shipping-address'],
      queryFn: getShippingAddress,
      staleTime: 60 * 1000 * 60,
    }
  );

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
        <div>
          <ContainerBody data={data} />
        </div>
      )}
    </div>
  );
};
