'use server';
import { db } from '@/lib/prisma';

export const getUnitId = async (
  productId: string
): Promise<string | undefined> => {
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

  const units = product?.units;
  const firstUnitId = units && units[0].id;

  return firstUnitId;
};
