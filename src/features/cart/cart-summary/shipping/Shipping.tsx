'use client';
import { useState } from 'react';
import { getShippingAddress } from '@/services/queries/getShippingAddress';
import { useCustomQuery } from '@/shared/hooks/queries';
import {
  ShippingBody,
  ShippingError,
  ShippingHeader,
} from './components/container';
import { QueryKeys } from '@/types/hooks';
import { ShippingData } from '@/types/user';

export const Shipping = () => {
  const { data, error, isFetching } = useCustomQuery<ShippingData>({
    queryKey: [QueryKeys.SHIPPING],
    queryFn: getShippingAddress,
    staleTime: 60 * 1000 * 60,
  });

  const [expanded, setExpanded] = useState(false);

  function handleExpand() {
    setExpanded(!expanded);
  }

  return (
    <div className='col-span-3 mt-3 font-light'>
      <ShippingHeader
        isFetching={isFetching}
        error={error}
        expanded={expanded}
        handleExpand={handleExpand}
      />

      {error ? <ShippingError /> : expanded && <ShippingBody data={data} />}
    </div>
  );
};
