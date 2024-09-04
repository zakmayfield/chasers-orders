import { Favorite } from '@prisma/client';
import { TProduct, TProductWithCategory } from './Product';

export type TFavorite = Favorite;
export type TFavoriteWithProduct = TFavorite & {
  product: TProduct;
};
export type TFavoriteWithProductAndCategory = TFavorite & {
  product: TProductWithCategory;
};
