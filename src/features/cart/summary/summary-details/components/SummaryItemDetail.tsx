import { CartItem } from '@/types/cart';

export const SummaryItemDetail = ({ item }: { item: CartItem }) => {
  return (
    <div className='flex flex-col bg-slate-50 rounded-lg p-3 last-of-type:border-none'>
      <div className='flex gap-3 text-sm'>
        <span className='text-gray-500'>x{item.quantity}</span>
        <span className='font-extralight'>{item.unit.size}</span>
        <span className='text-gray-500'>
          {item.unit.product.category.toLowerCase()}
        </span>
      </div>

      <span className='text-md font-extralight'>{item.unit.product.name}</span>
    </div>
  );
};
