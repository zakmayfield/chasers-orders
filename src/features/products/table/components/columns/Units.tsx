import { useAddToCart } from '@/shared/hooks/mutations';
import { CartIcon } from '@/utils/icons';
import { getRowData } from '@/utils/table';
import { UnitsColumnInfo } from '@/types/products';

export const UnitsColumn = ({ info }: { info: UnitsColumnInfo }) => {
  const { product } = getRowData(info);
  const { mutate: addToCart } = useAddToCart({});

  return (
    <div>
      <button
        className='w-12 text-xl p-1 flex justify-center rounded text-slate-700 hover:bg-slate-50'
        onClick={() => addToCart(product.units[0].id)}
      >
        <CartIcon />
      </button>
    </div>
  );
};
