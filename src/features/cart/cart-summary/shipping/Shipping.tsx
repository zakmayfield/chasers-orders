'use client';
import { useState } from 'react';
import { useGetShippingAddress } from '@/shared/hooks/data';
import {
  ShippingBody,
  ShippingError,
  ShippingHeader,
} from './components/container';

export const Shipping = () => {
  const { error, isFetching } = useGetShippingAddress();

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

      {error ? <ShippingError /> : expanded && <ShippingBody />}
    </div>
  );
};
