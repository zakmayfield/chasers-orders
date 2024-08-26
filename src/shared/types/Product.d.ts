import { Category, Favorite, Product, ProductVariant } from '@prisma/client';

export type TCategory = Category;
export type TProduct = Product;
export type TProductVariant = ProductVariant;
export type TFavorite = Favorite;

export type TProductWithCategory = TProduct & {
  category: TCategory;
};
export type TProductWithVariants = TProductWithCategory & {
  variants: TProductVariant;
};
export type TProductVariantWithProduct = TProductVariant & {
  product: TProduct;
};
export type TCategoryWithProducts = TCategory & {
  products: TProduct;
};
