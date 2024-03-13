'use server';

import { db } from '@/lib/prisma';
import type { Cart } from '@prisma/client';

export const fetchCart = async (userId?: string) => {
  const cart = await db.cart.findUnique({
    where: { userId },
    include: {
      items: true,
    },
  });
  return cart;
};

interface ICreateCart {
  (userId: string): Promise<ReducedCart>;
}

type ReducedCart = Pick<Cart, 'id'>;

export const createCart: ICreateCart = async (userId) =>
  await db.cart.create({
    data: {
      userId,
    },
    select: {
      id: true,
    },
  });
