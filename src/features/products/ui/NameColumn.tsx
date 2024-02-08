'use client';
import { useToast } from '@/hooks/useToast';
import { createFavorite } from '@/store/favorite/fav.create';
import { ProductWithUnits } from '@/types/types.product';
import { useMutation } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';

export default function NameColumn({
  products,
  info,
}: {
  products: ProductWithUnits[];
  info: CellContext<ProductWithUnits, string>;
}) {
  const { notify } = useToast();
  const product = products.find((item) => item.name === info.getValue());

  const { mutate: favorite } = useMutation({
    mutationFn: createFavorite,
    onError(error) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
    onSuccess(data) {
      notify(`❤️ added to favorites`);
    },
  });

  return (
    <div className='w-80 flex items-center'>
      <div
        className='cursor-pointer border rounded px-1'
        onClick={() => favorite(product?.id)}
      >
        ❤️
      </div>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap pl-3'>
        {info.getValue()}
      </div>
    </div>
  );
}
