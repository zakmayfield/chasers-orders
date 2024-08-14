'use client';
import { useState } from 'react';
import { ContainerBody, ContainerError, ContainerHeader } from './';
import { ShippingData } from '@/types/user';
import { getShippingAddress } from '@/services/queries/getShippingAddress';
import { useCustomQuery } from '@/shared/hooks/queries';
import { QueryKeys } from '@/types/hooks';

export const ShippingDetails = () => {
  const { data, error, isFetching } = useCustomQuery<ShippingData>({
    queryKey: [QueryKeys.SHIPPING],
    queryFn: getShippingAddress,
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
        <div>
          <ContainerBody data={data} />
        </div>
      )}
    </div>
  );
};
