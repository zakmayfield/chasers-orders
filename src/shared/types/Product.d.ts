import { Category, Favorite, Product, ProductVariant } from '@prisma/client';

export type TCategory = Category;
export type TProduct = Product;
export type TProductVariant = ProductVariant;

export type TProductWithCategory = TProduct & {
  category: TCategory | null;
};
export type TProductWithVariants = TProductWithCategory & {
  variants: TProductVariant[];
};
export type TProductVariantWithProduct = TProductVariant & {
  product: TProduct;
};
export type TProductVariantWithProductAndCategory = TProductVariant & {
  product: TProductWithCategory;
};
export type TCategoryWithProducts = TCategory & {
  products: TProduct[];
};

//^ TABLE
export type TableConfig = Table<TProductWithVariants>;

export interface TableConfigParams {
  tableConfig: TableConfig;
}

export type TableHeadersGroup = HeaderGroup<TProductWithVariants>;
export type TableRow = Row<TProductWithVariants>;

export type TableRowInfo<T> = CellContext<TProductWithVariants, T>;
export type NameColumnInfo = TableRowInfo<string>;
export type CategoryColumnInfo = TableRowInfo<string>;
export type UnitsColumnInfo = TableRowInfo<Unit[]>;
