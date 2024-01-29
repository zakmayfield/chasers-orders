import { db } from '@/lib/db';

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
