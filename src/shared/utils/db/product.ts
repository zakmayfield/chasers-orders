'use server';
import { db } from '@/lib/prisma';
import {
  TProductVariant,
  TProductWithCategory,
  TProductVariantWithProduct,
  TCategoryWithProducts,
  TProductWithVariants,
} from '@/shared/types/Product';

type TGetAllProducts = (props: {
  variants?: boolean;
}) => Promise<TProductWithCategory[] | TProductWithVariants[]>;
export const getAllProducts: TGetAllProducts = async ({ variants }) => {
  const products = await db.product.findMany({
    include: { category: true, variants },
  });
  return products;
};

type TGetProductById = (props: {
  product_id: string;
  hasVariants?: boolean;
}) => Promise<TProductWithCategory | TProductWithVariants | null>;
export const getProductById: TGetProductById = async ({
  product_id,
  hasVariants,
}) => {
  const product = await db.product.findUnique({
    where: { product_id },
    include: { category: true, variants: hasVariants },
  });
  return product;
};

type TGetProductVariantById = (props: {
  product_variant_id: string;
  hasProduct?: boolean;
}) => Promise<TProductVariant | TProductVariantWithProduct | null>;
export const getProductVariantById: TGetProductVariantById = async ({
  product_variant_id,
  hasProduct = false,
}) => {
  const productVariant = await db.productVariant.findUnique({
    where: { product_variant_id },
    include: { product: hasProduct },
  });
  return productVariant;
};

type TGetFirstVariantId = (props: {
  product_id: string;
}) => Promise<string | undefined>;
export const getFirstVariantId: TGetFirstVariantId = async ({ product_id }) => {
  const product = await db.product.findUnique({
    where: { product_id },
    include: { variants: true },
  });
  const firstVariantId = product?.variants[0].product_variant_id;
  return firstVariantId;
};

type TGetCategoryWithProducts = (props: {
  category_id: string;
}) => Promise<TCategoryWithProducts | null>;
export const getCategoryWithProducts: TGetCategoryWithProducts = async ({
  category_id,
}) => {
  const categoryWithProducts = await db.category.findUnique({
    where: { category_id },
    include: { products: true },
  });
  return categoryWithProducts;
};
