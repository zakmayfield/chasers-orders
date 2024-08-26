'use server';
import { db } from '@/lib/prisma';
import { TCart, TCartWithItems } from '@/shared/types/Cart';

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
