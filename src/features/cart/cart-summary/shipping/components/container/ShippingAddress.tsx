import { useGetShippingAddress } from '@/shared/hooks/queries';

export const ShippingAddress = () => {
  const { data } = useGetShippingAddress();
  return (
    <div>
      <p className='text-lg font-light mb-3'>{data?.companyName}</p>

      <div className=' bg-light-primary p-3 rounded-lg flex flex-col gap-2'>
        <p className=''>{data?.shippingAddress.streetAddress}</p>
        <p>
          <span>{data?.shippingAddress.city}</span>,{' '}
          <span>{data?.shippingAddress.state}</span>
        </p>
        <p>{data?.shippingAddress.postalCode}, Canada</p>
      </div>
    </div>
  );
};
