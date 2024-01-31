import { db } from '@/lib/db.prisma-client';

export const createCart = async (userId: string) => {
  try {
    await db.cart.create({
      data: {
        userId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
