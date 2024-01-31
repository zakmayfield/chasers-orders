import { db } from '@/lib/db.prisma-client';
import type { Cart } from '@prisma/client';

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
