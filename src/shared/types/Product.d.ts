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
export type TCategoryWithProducts = TCategory & {
  products: TProduct[];
};
