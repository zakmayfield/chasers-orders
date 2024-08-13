import { NameColumnInfo } from '@/types/products';
import { HeartOutlineIcon } from '@/utils/icons';

export const NameColumn = ({ info }: { info: NameColumnInfo }) => {
  // const productId = info.row.original.id;

  // const {
  //   query: { isLoading },
  //   favorite: { isProductFavorited, favoriteId },
  // } = useFavorites({
  //   productId,
  // });

  // const { mutate: toggleFavorite } = useToggleFavorite({});

  // const handleToggleFavorite = () => {
  //   let action: ToggleFavoriteAction;

  //   if (isProductFavorited && favoriteId) {
  //     action = { action: 'remove', productId: favoriteId! };
  //   } else {
  //     action = { action: 'add', productId: productId };
  //   }

  //   toggleFavorite(action);
  // };

  return (
    <div className='flex items-center'>
      <div
        className='cursor-pointer hover:text-green-600 px-1'
        onClick={() => console.info('toggle favorite')}
      >
        <HeartOutlineIcon />
      </div>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap pl-3'>
        {info.getValue()}
      </div>
    </div>
  );
};
