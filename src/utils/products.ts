'use server';
import { db } from '@/lib/prisma';

export const getUnitId = async (productId: string): Promise<string> => {
  const product = await db.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      units: {
        select: {
          id: true,
        },
      },
    },
  });

  return product!.units[0].id;
};
