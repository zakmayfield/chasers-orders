'use server';
import { db } from '@/lib/prisma';
import {
  TCart,
  TCartItem,
  TCartItemWithProductVariant,
  TCartWithItems,
  TCartWithItemsAndProductVariants,
} from '@/shared/types/Cart';

type TCreateCart = (props: { user_id: string }) => Promise<TCart>;
export const createCart: TCreateCart = async ({ user_id }) => {
  const cart = await db.cart.create({
    data: {
      user_id,
    },
  });
  return cart;
};

type TGetCartWithItems = (props: {
  user_id: string;
}) => Promise<TCartWithItems | null>;
export const getCartWithItems: TGetCartWithItems = async ({ user_id }) => {
  const cart = await db.cart.findUnique({
    where: { user_id },
    include: {
      items: true,
    },
  });

  return cart;
};

type TGetCartWithItemsAndProductVariants = (props: {
  user_id: string;
}) => Promise<TCartWithItemsAndProductVariants | null>;
export const getCartWithItemsAndProductVariants: TGetCartWithItemsAndProductVariants =
  async ({ user_id }) => {
    const cart = await db.cart.findUnique({
      where: { user_id },
      include: {
        items: {
          include: {
            product_variant: true,
          },
        },
      },
    });

    return cart;
  };

type TGetCartItem = (props: {
  cart_id: string;
  product_variant_id: string;
}) => Promise<TCartItem | null>;
export const getCartItem: TGetCartItem = async ({
  cart_id,
  product_variant_id,
}) => {
  const cartItem = await db.cartItem.findUnique({
    where: { cart_id, product_variant_id },
  });
  return cartItem;
};

type TGetCartItems = (props: {
  cart_id: string;
  product_variant_id: string;
}) => Promise<TCartItem[]>;
export const getCartItems: TGetCartItems = async ({
  cart_id,
  product_variant_id,
}) => {
  const cartItems = await db.cartItem.findMany({
    where: { cart_id, product_variant_id },
  });
  return cartItems;
};

type TGetCartItemWithProductVariant = (props: {
  cart_id: string;
  product_variant_id: string;
}) => Promise<TCartItemWithProductVariant | null>;
export const getCartItemWithProductVariant: TGetCartItemWithProductVariant =
  async ({ cart_id, product_variant_id }) => {
    const cartItem = await db.cartItem.findUnique({
      where: { cart_id, product_variant_id },
      include: { product_variant: true },
    });
    return cartItem;
  };

type TGetCartItemsWithProductVariant = (props: {
  cart_id: string;
  product_variant_id: string;
}) => Promise<TCartItemWithProductVariant[]>;
export const getCartItemsWithProductVariant: TGetCartItemsWithProductVariant =
  async ({ cart_id, product_variant_id }) => {
    const cartItem = await db.cartItem.findMany({
      where: { cart_id, product_variant_id },
      include: { product_variant: true },
    });
    return cartItem;
  };
