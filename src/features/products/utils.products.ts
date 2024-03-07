'use server';

import { db } from '@/lib/prisma';

type ReturnType = {
  (productId: string): Promise<string | undefined>;
};

export const getFirstUnitOfProduct: ReturnType = async (productId) => {
  const product = await db.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      units: true,
    },
  });

  const units = product?.units;
  const firstUnitId = units && units[0].id;

  return firstUnitId;
};
