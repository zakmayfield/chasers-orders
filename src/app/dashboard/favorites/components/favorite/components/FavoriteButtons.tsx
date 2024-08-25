import { CartIcon, XIcon } from '@/utils/icons';

export const FavoriteButtonGroup = ({
  handleAddToCart,
  handleToggleFavorite,
}: {
  handleAddToCart(): Promise<void>;
  handleToggleFavorite(): void;
}) => {
  return (
    <div>
      <div className='flex items-center gap-6  ml-auto'>
        <button onClick={handleAddToCart}>
          <CartIcon className='text-2xl hover:text-light-green-500' />
        </button>

        <button onClick={handleToggleFavorite}>
          <XIcon className='text-lg text-gray-500 hover:text-light-text' />
        </button>
      </div>
    </div>
  );
};
