import { useAddToCart } from '@/shared/hooks/mutations';
import { CartIcon } from '@/shared/utils/ui';

import { UnitsColumnInfo } from '@/types/products';

export const UnitsColumn = ({ info }: { info: UnitsColumnInfo }) => {
  const product = info.row.original;
  const { mutate: addToCart } = useAddToCart({});

  return (
    <div className='flex justify-center'>
      <button
        className='w-12 text-xl p-1 flex justify-center rounded text-slate-700 hover:bg-slate-50'
        onClick={() => addToCart(product.units[0].id)}
      >
        <CartIcon />
      </button>
    </div>
  );
};
