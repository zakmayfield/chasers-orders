import { FC } from 'react';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

interface EmptyItemsProps {}

export const EmptyItems: FC<EmptyItemsProps> = ({}) => {
  return (
    <div className='py-6 font-light flex items-center gap-3  '>
      <span>
        <MdOutlineRemoveShoppingCart />
      </span>
      <span>Your cart is empty</span>
    </div>
  );
};
