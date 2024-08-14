import { Favorite, Product, Unit } from '@prisma/client';
import { CellContext, HeaderGroup, Row, Table } from '@tanstack/react-table';

export type ProductWithUnits = Product & {
  units: Unit[];
};

export type ToggleFavoriteAction = {
  action: 'add' | 'remove';
  productId: string;
  favoriteId?: string;
};

export type ExtendedFavorite = Favorite & {
  product: Product;
};

//^ Product Table
export type TableConfig = Table<ProductWithUnits>;

export interface TableConfigParams {
  tableConfig: TableConfig;
}

export type TableHeadersGroup = HeaderGroup<ProductWithUnits>;
export type TableRow = Row<ProductWithUnits>;

export type TableRowInfo<T> = CellContext<ProductWithUnits, T>;
export type NameColumnInfo = TableRowInfo<string>;
export type CategoryColumnInfo = TableRowInfo<string>;
export type UnitsColumnInfo = TableRowInfo<Unit[]>;
