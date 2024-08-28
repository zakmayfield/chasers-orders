import { TProductWithVariants } from '@/shared/types/Product';
import { Favorite, Product, Unit } from '@prisma/client';
import { CellContext, HeaderGroup, Row, Table } from '@tanstack/react-table';

export type ProductWithUnits = Product & {
  units: Unit[];
};

export type ToggleFavoriteAction = {
  action: 'add' | 'remove';
  productId?: string;
  favoriteId?: string;
};

export type ExtendedFavorite = Favorite & {
  product: Product;
};
