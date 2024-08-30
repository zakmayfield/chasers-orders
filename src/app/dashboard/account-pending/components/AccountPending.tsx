'use client';
import { Heading, SpinLoader } from '@/shared/components/ui';
import { AccountPendingData } from './AccountPendingData';
import { useGetAuthorization } from '@/shared/hooks/data';
import {
  useGetProduct,
  useGetProductVariant,
} from '@/shared/hooks/data/products/useProducts';
import { useEffect } from 'react';

export const AccountPending = () => {
  const { isLoading } = useGetAuthorization();
  const { data } = useGetProductVariant({
    product_variant_id: 'cm0b4drjs000nstwo1blqa7fs',
    hasProduct: true,
  });
  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <div className='min-h-[35rem] flex flex-col gap-6'>
      {/* Account Pending Header */}
      <div className='flex items-center gap-3'>
        <Heading as='h2' content='Account Status' />
        {isLoading && <SpinLoader />}
      </div>

      {/* Account Pending Data */}
      <AccountPendingData />
    </div>
  );
};
