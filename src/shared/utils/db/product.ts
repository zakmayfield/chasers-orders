'use server';
import { db } from '@/lib/prisma';
import {
  TProductVariantWithProduct,
  TCategoryWithProducts,
  TProductWithVariants,
} from '@/shared/types/Product';

type TGetAllProducts = (props: {
  take?: number;
}) => Promise<TProductWithVariants[]>;
export const getAllProducts: TGetAllProducts = async ({ take }) => {
  const products = await db.product.findMany({
    include: { category: true, variants: true },
    take,
  });
  return products;
};

type TGetProductById = (props: {
  product_id: string;
}) => Promise<TProductWithVariants | null>;
export const getProductById: TGetProductById = async ({ product_id }) => {
  const product = await db.product.findUnique({
    where: { product_id },
    include: { category: true, variants: true },
  });
  return product;
};

type TGetProductVariantById = (props: {
  product_variant_id: string;
}) => Promise<TProductVariantWithProduct | null>;
export const getProductVariantById: TGetProductVariantById = async ({
  product_variant_id,
}) => {
  const productVariant = await db.productVariant.findUnique({
    where: { product_variant_id },
    include: { product: true },
  });
  return productVariant;
};

type TGetFirstVariantId = (props: { product_id: string }) => Promise<string>;
export const getFirstVariantId: TGetFirstVariantId = async ({ product_id }) => {
  const product = await db.product.findUnique({
    where: { product_id },
    include: { variants: true },
  });
  const firstVariantId = product?.variants[0].product_variant_id!;
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
