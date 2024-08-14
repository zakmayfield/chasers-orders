'use server';

import { db } from '@/lib/prisma';
import { CartWithItems } from '@/types/cart';
import type { Cart } from '@prisma/client';

export const fetchCart = async (
  userId: string
): Promise<CartWithItems | null> =>
  await db.cart.findUnique({
    where: { userId },
    include: {
      items: true,
    },
  });

export const createCart = async (userId: string): Promise<Cart> =>
  await db.cart.create({
    data: {
      userId,
    },
  });
