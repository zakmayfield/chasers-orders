'use server';
import { db } from '@/lib/prisma';
import {
  TProductVariant,
  TProductWithCategory,
  TProductVariantWithProduct,
  TCategoryWithProducts,
  TProductWithVariants,
} from '@/shared/types/Product';

type TGetAllProducts = () => Promise<TProductWithCategory[]>;
export const getAllProducts: TGetAllProducts = async () => {
  const products = await db.product.findMany({
    include: { category: true },
  });
  return products;
};
type TGetAllProductsWithVariants = () => Promise<TProductWithVariants[]>;
export const getAllProductsWithVariants: TGetAllProductsWithVariants =
  async () => {
    const products = await db.product.findMany({
      include: { category: true, variants: true },
    });
    return products;
  };

type TGetProductById = (props: {
  product_id: string;
}) => Promise<TProductWithCategory | null>;
export const getProductById: TGetProductById = async ({ product_id }) => {
  const product = await db.product.findUnique({
    where: { product_id },
    include: { category: true },
  });
  return product;
};

type TGetProductVariants = (props: {
  product_id: string;
}) => Promise<TProductVariant[]>;
export const getProductVariants: TGetProductVariants = async ({
  product_id,
}) => {
  const productVariants = await db.productVariant.findMany({
    where: { product_id },
  });
  return productVariants;
};

type TGetProductVariantById = (props: {
  product_variant_id: string;
}) => Promise<TProductVariant | null>;
export const getProductVariantById: TGetProductVariantById = async ({
  product_variant_id,
}) => {
  const productVariant = await db.productVariant.findUnique({
    where: { product_variant_id },
  });
  return productVariant;
};

type TGetProductWithVariants = (props: {
  product_id: string;
}) => Promise<TProductWithVariants | null>;

export const getProductWithVariants: TGetProductWithVariants = async ({
  product_id,
}) => {
  const productWithVariants = await db.product.findUnique({
    where: { product_id },
    include: { category: true, variants: true },
  });
  return productWithVariants;
};

type TGetProductVariantWithProduct = (props: {
  product_variant_id: string;
}) => Promise<TProductVariantWithProduct | null>;

export const getProductVariantWithProduct: TGetProductVariantWithProduct =
  async ({ product_variant_id }) => {
    const productVariantWithProduct = await db.productVariant.findUnique({
      where: { product_variant_id },
      include: { product: true },
    });
    return productVariantWithProduct;
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
