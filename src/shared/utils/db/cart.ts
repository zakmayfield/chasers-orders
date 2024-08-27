'use server';
import { db } from '@/lib/prisma';
import { TBatchPayload } from '@/shared/types/API';
import {
  TCart,
  TCartItem,
  TCartItemWithProductVariant,
  TCartWithItems,
  TCartWithItemsAndProductVariants,
} from '@/shared/types/Cart';

//^ POST
type TCreateCart = (props: { user_id: string }) => Promise<TCart>;
export const createCart: TCreateCart = async ({ user_id }) => {
  const cart = await db.cart.create({
    data: {
      user_id,
    },
  });
  return cart;
};

type TAddItemToCart = (props: {
  cart_id: string;
  product_variant_id: string;
  quantity: number;
}) => Promise<TCartItem>;
export const addItemToCart: TAddItemToCart = async ({
  cart_id,
  product_variant_id,
  quantity,
}) => {
  const cartItem = await db.cartItem.create({
    data: { cart_id, product_variant_id, quantity },
  });
  return cartItem;
};

//^ DELETE
type TEmptyCart = (props: { cart_id: string }) => Promise<TBatchPayload>;
export const emptyCart: TEmptyCart = async ({ cart_id }) => {
  const del = await db.cartItem.deleteMany({
    where: { cart_id },
  });
  return { count: del.count };
};

type TDeleteCartItem = (props: {
  cart_id: string;
  product_variant_id: string;
}) => Promise<TCartItem>;
export const deleteCartItem: TDeleteCartItem = async ({
  cart_id,
  product_variant_id,
}) => {
  const cartItem = await db.cartItem.delete({
    where: { cart_id, product_variant_id },
  });
  return cartItem;
};

//^ PUT
type TUpdateCartItemQuantity = (props: {
  cart_id: string;
  product_variant_id: string;
  quantity: number;
}) => Promise<TCartItem>;
export const updateCartItemQuantity: TUpdateCartItemQuantity = async ({
  cart_id,
  product_variant_id,
  quantity,
}) => {
  const cartItem = await db.cartItem.update({
    where: { cart_id, product_variant_id },
    data: { quantity },
  });
  return cartItem;
};

type TIncrementCartItemQuantity = (props: {
  cart_id: string;
  product_variant_id: string;
  currentQuantity: number;
}) => Promise<TCartItem>;
export const incrementCartItemQuantity: TIncrementCartItemQuantity = async ({
  cart_id,
  product_variant_id,
  currentQuantity,
}) => {
  const cartItem = await db.cartItem.update({
    where: { cart_id, product_variant_id },
    data: {
      quantity: currentQuantity + 1,
    },
  });
  return cartItem;
};

type TDecrementCartItemQuantity = (props: {
  cart_id: string;
  product_variant_id: string;
  currentQuantity: number;
}) => Promise<TCartItem>;
export const decrementCartItemQuantity: TDecrementCartItemQuantity = async ({
  cart_id,
  product_variant_id,
  currentQuantity,
}) => {
  if (currentQuantity === 1) {
    const deleteCartItem = await db.cartItem.delete({
      where: { cart_id, product_variant_id },
    });
    return deleteCartItem;
  } else {
    const updateCartItem = await db.cartItem.update({
      where: { cart_id, product_variant_id },
      data: {
        quantity: currentQuantity + 1,
      },
    });
    return updateCartItem;
  }
};

type TUpdateCartItemSize = (props: {
  cart_id: string;
  product_variant_id: string;
  new_variant_id: string;
}) => Promise<TCartItem>;
export const updateCartItemSize: TUpdateCartItemSize = async ({
  cart_id,
  product_variant_id,
  new_variant_id,
}) => {
  const cartItem = await db.cartItem.update({
    where: { cart_id, product_variant_id },
    data: { product_variant_id: new_variant_id },
  });
  return cartItem;
};

//^ GET
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
