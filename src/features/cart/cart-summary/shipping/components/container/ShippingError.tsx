import { CiWarning } from 'react-icons/ci';

export const ShippingError = () => {
  return (
    <div className='my-6'>
      <p className=' flex items-center gap-3 font-extralight'>
        Could not locate shipping information{' '}
        <span className='text-yellow-600 text-xl'>
          <CiWarning />
        </span>
      </p>
    </div>
  );
};
