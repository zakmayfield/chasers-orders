import { Favorite, Product, Unit } from '@prisma/client';

export type ProductWithUnits = Product & {
  units: Unit[];
};

export type ToggleFavoriteAction = {
  action: 'add' | 'remove';
  productId: string;
};

export type ExtendedFavorite = Favorite & {
  product: Product;
};
