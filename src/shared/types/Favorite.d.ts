import { Favorite } from '@prisma/client';
import { TProduct } from './Product';

export type TFavorite = Favorite;
export type TFavoriteWithProduct = TFavorite & {
  product: TProduct;
};
