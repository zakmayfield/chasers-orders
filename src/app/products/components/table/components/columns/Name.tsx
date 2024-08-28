import { HeartDuotoneIcon, HeartOutlineIcon } from '@/shared/utils/ui';
import { useToggleFavorite } from '@/shared/hooks/mutations';
import { useGetFavorites } from '@/shared/hooks/data';
import { ToggleFavoriteAction } from '@/types/products';
import { NameColumnInfo } from '@/shared/types/Product';

export const NameColumn = ({
  info,
  isFavorite,
}: {
  info: NameColumnInfo;
  isFavorite: boolean;
}) => {
  const productId = info.row.original.id;

  return (
    <div className='flex items-center'>
      <FavoriteButton isFavorite={isFavorite} productId={productId} />
      <div className='overflow-hidden text-ellipsis whitespace-nowrap pl-3'>
        {info.getValue()}
      </div>
    </div>
  );
};

function FavoriteButton({
  isFavorite,
  productId,
}: {
  isFavorite: boolean;
  productId: string;
}) {
  const { data: favorites } = useGetFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite({});

  const toggleAction: ToggleFavoriteAction = {
    action: isFavorite ? 'remove' : 'add',
    productId,
    favoriteId: favorites?.find((favorite) => favorite.productId === productId)
      ?.id,
  };

  return (
    <div
      className={`cursor-pointer px-1 flex items-center hover:text-green-500 ${isFavorite && 'text-green-600'}`}
    >
      <button className='text-xl' onClick={() => toggleFavorite(toggleAction)}>
        {isFavorite ? <HeartDuotoneIcon /> : <HeartOutlineIcon />}
      </button>
    </div>
  );
}
