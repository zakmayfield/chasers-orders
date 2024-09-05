'use server';
import { db } from '@/lib/prisma';
import { TBatchPayload } from '@/shared/types/API';
import { TCart, TCartItem } from '@/shared/types/Cart';

//^ POST
type TCreateCart = (props: { user_id: string }) => Promise<string>;
export const createCart: TCreateCart = async ({ user_id }) => {
  const cart = await db.cart.create({
    data: {
      user_id,
    },
  });
  return cart.cart_id;
};

type TAddItemToCart = (props: {
  cart_id: string;
  product_variant_id: string;
  quantity: number;
}) => Promise<TCartItem>;
export const addItemToCart: TAddItemToCart = async (props) => {
  const cartItem = await db.cartItem.create({
    data: { ...props },
    include: {
      product_variant: {
        include: { product: { include: { category: true } } },
      },
    },
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
}) => Promise<{ product_variant_id: string }>;
export const deleteCartItem: TDeleteCartItem = async ({
  cart_id,
  product_variant_id,
}) => {
  const cartItem = await db.cartItem.delete({
    where: { cart_id, product_variant_id },
  });
  return {
    product_variant_id: cartItem.product_variant_id,
  };
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
    include: {
      product_variant: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
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
    include: {
      product_variant: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
  return cartItem;
};

type TDecrementCartItemQuantity = (props: {
  cart_id: string;
  product_variant_id: string;
  currentQuantity: number;
}) => Promise<TCartItem | null>;
export const decrementCartItemQuantity: TDecrementCartItemQuantity = async ({
  cart_id,
  product_variant_id,
  currentQuantity,
}) => {
  if (currentQuantity === 1) {
    const getItem = await db.cartItem.findUnique({
      where: { cart_id, product_variant_id },
      include: {
        product_variant: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
    return getItem;
  } else {
    const updateCartItem = await db.cartItem.update({
      where: { cart_id, product_variant_id },
      data: {
        quantity: currentQuantity + 1,
      },
      include: {
        product_variant: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
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
    include: {
      product_variant: {
        include: { product: { include: { category: true } } },
      },
    },
  });
  return cartItem;
};

//^ GET
type TGetCartWithItemsAndProductVariants = (props: {
  user_id: string;
}) => Promise<TCart | null>;
export const getCart: TGetCartWithItemsAndProductVariants = async (props) => {
  const cart = await db.cart.findUnique({
    where: { ...props },
    include: {
      items: {
        include: {
          product_variant: {
            include: { product: { include: { category: true } } },
          },
        },
      },
    },
  });

  return cart;
};

type TGetCartItems = (props: { cart_id: string }) => Promise<TCartItem[]>;
export const getCartItems: TGetCartItems = async (props) => {
  const cartItems = await db.cartItem.findMany({
    where: { ...props },
    include: {
      product_variant: {
        include: { product: { include: { category: true } } },
      },
    },
  });
  return cartItems;
};

type TGetCartItem = (props: {
  cart_id: string;
  product_variant_id: string;
}) => Promise<TCartItem | null>;
export const getCartItem: TGetCartItem = async (props) => {
  const cartItem = await db.cartItem.findUnique({
    where: { ...props },
    include: {
      product_variant: {
        include: { product: { include: { category: true } } },
      },
    },
  });
  return cartItem;
};

export const checkIsItemInCart = async (props: {
  cart_id: string;
  product_variant_id: string;
}): Promise<{ quantity: number }> => {
  const cartItem = await db.cartItem.findUnique({
    where: { ...props },
    select: { quantity: true },
  });

  if (cartItem && cartItem.quantity) {
    return { quantity: cartItem.quantity };
  }

  return { quantity: 0 };
};
